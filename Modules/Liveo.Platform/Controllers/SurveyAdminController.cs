using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Liveo.Framework.Model;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Liveo.Platform.ViewModels;
using Orchard;
using Orchard.ContentManagement;
using Orchard.Core.Title.Models;
using Orchard.DisplayManagement;
using Orchard.Localization;
using Orchard.Mvc.Extensions;
using Orchard.Settings;
using Orchard.UI.Admin;
using Orchard.UI.Navigation;
using Liveo.Platform.Extensions;
using Orchard.UI.Notify;

namespace Liveo.Platform.Controllers
{
    [ValidateInput(false), Admin]
    public class SurveyAdminController : Controller, IUpdateModel {
        private readonly ILiveoSurveyService _liveoSurveyService;
        private readonly ILiveoSurveyQuestionService _questionService;
        private readonly IOrchardServices _orchardServices;
        private readonly ISiteService _siteService;

        private dynamic Shape { get; set; }
        private Localizer T { get; set; }

        public SurveyAdminController(IOrchardServices orchardServices,
            ILiveoSurveyService liveoSurveyService,
            ILiveoSurveyQuestionService questionService,
            ISiteService siteService,
            IShapeFactory shapeFactory) {
            _orchardServices = orchardServices;
            _liveoSurveyService = liveoSurveyService;
            _questionService = questionService;
            _siteService = siteService;
            Shape = shapeFactory;
            T = NullLocalizer.Instance;
        }

        protected IOrchardServices Services
        {
            get { return _orchardServices; }
        }

        public ActionResult Create() {
            var survey = Services.ContentManager.New<SurveyPart>("Survey");

            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            dynamic model = Services.ContentManager.BuildEditor(survey);

            // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
            return View((object)model);
        }

        [HttpPost, ActionName("Create")]
        [FormValueRequired("submit.Save")]
        public ActionResult CreateSurvey()
        {
            var survey = Services.ContentManager.New<SurveyPart>("Survey");

            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            var model = Services.ContentManager.UpdateEditor(survey, this);

            if (!ModelState.IsValid)
            {
                Services.TransactionManager.Cancel();
                // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
                return View((object)model);
            }

            _liveoSurveyService.CreatePart(survey);

            Services.Notifier.Information(T("Your survey has been created."));
            return Redirect(Url.SurveyEdit(survey));
        }

        public ActionResult Edit(int surveyId)
        {
            var survey = _liveoSurveyService.Get(surveyId);
            if (survey == null)
                return HttpNotFound();

            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            dynamic model = Services.ContentManager.BuildEditor(survey);
            // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
            return View((object)model);
        }

        [HttpPost, ActionName("Edit")]
        [FormValueRequired("submit.Save")]
        public ActionResult EditSurvey(int surveyId, string returnUrl)
        {
            var survey = _liveoSurveyService.Get(surveyId);
            if (survey == null)
                return HttpNotFound();

            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            // Validate form input
            var model = Services.ContentManager.UpdateEditor(survey, this);
            if (!ModelState.IsValid)
            {
                Services.TransactionManager.Cancel();
                // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
                return View((object)model);
            }

            _liveoSurveyService.UpdatePart(survey);

            Services.Notifier.Information(T("Your {0} has been saved.", survey.TypeDefinition.DisplayName));

            return this.RedirectLocal(returnUrl, Url.SurveyEdit(survey));
        }

        public ActionResult Delete(int surveyId, string returnUrl) {
            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            var survey = _liveoSurveyService.Get(surveyId);
            if (survey == null)
                return new HttpNotFoundResult();

            _liveoSurveyService.DeletePart(survey);

            Services.Notifier.Information(T("Your {0} has been deleted.", survey.TypeDefinition.DisplayName));
            return this.RedirectLocal(returnUrl);
        }

        public ActionResult List(PagerParameters pagerParameters, SurveySearchViewModel search) {
            var query = Services.ContentManager.Query<SurveyPart>().List();

            if (!string.IsNullOrWhiteSpace(search.Expression))
            {
                string expression = search.Expression.Trim();
                query = query.Where(s => s.Name.Contains(expression));
            }

            // The pager is used to apply paging on the query and to create a PagerShape
            var pager = new Pager(_siteService.GetSiteSettings(), pagerParameters.Page, pagerParameters.PageSize);

            // Construct a Pager shape
            var pagerShape = Shape.Pager(pager).TotalItemCount(query.Count());

            // Create the viewmodel
            var model = new SurveyListViewModel(query.ToList(), search, pagerShape);
            return View(model);
        }

        public ActionResult ListQuestions(int surveyId, PagerParameters pagerParameters, SurveyQuestionSearchViewModel search) {
            var survey = _liveoSurveyService.Get(surveyId);

            if (survey == null)
                return new HttpNotFoundResult();

            var query = _liveoSurveyService.Questions.Where(q => q.SurveyId == survey.SurveyId);

            if (!string.IsNullOrWhiteSpace(search.Expression))
            {
                string expression = search.Expression.Trim();

                query = query.Where(q => q.QuestionText.Contains(expression, StringComparison.InvariantCultureIgnoreCase));
            }

            // The pager is used to apply paging on the query and to create a PagerShape
            var pager = new Pager(_siteService.GetSiteSettings(), pagerParameters.Page, pagerParameters.PageSize);

            // Construct a Pager shape
            var pagerShape = Shape.Pager(pager).TotalItemCount(query.Count());

            // Create the viewmodel
            var model = new SurveyQuestionListViewModel(query.ToList(), search, pagerShape);
            model.SurveyId = surveyId;
            return View(model);
        }

        public ActionResult CreateQuestion(int surveyId) {
            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            var survey = _liveoSurveyService.Get(surveyId);
            if (survey == null)
                return new HttpNotFoundResult();

            var question = new SurveyQuestionCreateViewModel();
            question.QuestionTypes = _liveoSurveyService.QuestionTypes;
            question.SurveyId = survey.SurveyId;

            return View(question);
        }

        [HttpPost]
        [ActionName("CreateQuestion")]
        public ActionResult PostCreateQuestion(SurveyQuestionCreateViewModel model) {
            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            if (!ModelState.IsValid) {
                return View(model);
            }

            var question = new SurveyQuestion();
            question.SurveyId = model.SurveyId;
            question.QuestionText = model.QuestionText;
            question.QuestionTypeId = model.QuestionTypeId;

            _questionService.Add(question);

            return this.RedirectLocal(Url.SurveyQuestionEdit(question.Id));
        }

        [HttpPost]
        [ActionName("EditQuestion")]
        public ActionResult PostEditQuestion(SurveyQuestionEditViewModel model)
        {
            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            if (!ModelState.IsValid) {
                return View(model);
            }

            _questionService.Save(model.Question);
            Services.Notifier.Information(T("Your question has been saved."));
            return View(model);
        }

        public ActionResult EditQuestion(int questionId) {
            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            var question = _liveoSurveyService.Questions.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
                return new HttpNotFoundResult();
            var editViewModel = new SurveyQuestionEditViewModel();
            editViewModel.Question = question;
            editViewModel.QuestionTypes = _liveoSurveyService.QuestionTypes;
            
            return View(editViewModel);
        }

        public ActionResult DeleteQuestion(int questionId, string returnUrl) {
            if (!Services.Authorizer.Authorize(Permissions.ManageSurveys))
                return new HttpUnauthorizedResult();

            var question = _liveoSurveyService.Questions.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
                return new HttpNotFoundResult();

            _questionService.Delete(question);

            Services.Notifier.Information(T("Your question has been deleted."));
            return this.RedirectLocal(returnUrl);
        }

        bool IUpdateModel.TryUpdateModel<TModel>(TModel model, string prefix, string[] includeProperties, string[] excludeProperties) {
            return TryUpdateModel(model, prefix, includeProperties, excludeProperties);
        }

        void IUpdateModel.AddModelError(string key, LocalizedString errorMessage)
        {
            ModelState.AddModelError(key, errorMessage.ToString());
        }
    }
}