using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using Liveo.Framework.Model;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Orchard;
using Orchard.ContentManagement;
using Orchard.Core.Title.Models;
using Orchard.Localization;
using Orchard.Mvc.AntiForgery;
using Orchard.Mvc.Extensions;
using Orchard.Settings;
using Orchard.UI.Admin;
using Orchard.UI.Notify;
using Liveo.Platform.Extensions;

namespace Liveo.Platform.Controllers
{
    [ValidateInput(false), Admin]
    public class AffiliateAdminController : Controller, IUpdateModel
    {
        private readonly ILiveoAffiliateService _liveoAffiliateService;
        private readonly ISiteService _siteService;
        private readonly IOrchardServices _orchardServices;
        private dynamic Shape { get; set; }
        private Localizer T { get; set; }

        public AffiliateAdminController(IOrchardServices orchardServices,
            ISiteService siteService,
            ILiveoAffiliateService liveoAffiliateService) {
            _orchardServices = orchardServices;
            _siteService = siteService;
            _liveoAffiliateService = liveoAffiliateService;
            T = NullLocalizer.Instance;
        }

        protected IOrchardServices Services {
            get { return _orchardServices; }
        }

        public ActionResult Create() {
            var affiliate = Services.ContentManager.New<AffiliatePart>("Affiliate");

            if (!Services.Authorizer.Authorize(Permissions.ManageAffiliates))
                return new HttpUnauthorizedResult();

            dynamic model = Services.ContentManager.BuildEditor(affiliate);

            // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
            return View((object)model);
        }

        [HttpPost, ActionName("Create")]
        [FormValueRequired("submit.Save")]
        public ActionResult CreateAffiliate()
        {
            var affiliate = Services.ContentManager.New<AffiliatePart>("Affiliate");

            if (!Services.Authorizer.Authorize(Permissions.ManageAffiliates))
                return new HttpUnauthorizedResult();

            var model = Services.ContentManager.UpdateEditor(affiliate, this);

            if (!ModelState.IsValid)
            {
                Services.TransactionManager.Cancel();
                // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
                return View((object)model);
            }

            var title = affiliate.As<TitlePart>();

            var innerAffiliate = new Affiliate();
            innerAffiliate.Name = title.Title;

            _liveoAffiliateService.Add(innerAffiliate);

            affiliate.AffiliateId = innerAffiliate.Id;

            affiliate.Affiliate = innerAffiliate;
            
            Services.ContentManager.Create(affiliate.ContentItem);
            

            Services.Notifier.Information(T("Your affiliate has been created."));
            return Redirect(Url.AffiliateEdit(affiliate));
        }

        public ActionResult Edit(int affiliateId) {
            var affiliate = _liveoAffiliateService.Get(affiliateId);
            if (affiliate == null)
                return HttpNotFound();

            if (!Services.Authorizer.Authorize(Permissions.ManageAffiliates))
                return new HttpUnauthorizedResult();

            dynamic model = Services.ContentManager.BuildEditor(affiliate);
            // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
            return View((object)model);
        }

        [HttpPost, ActionName("Edit")]
        [FormValueRequired("submit.Save")]
        public ActionResult EditAffiliate(int affiliateId, string returnUrl)
        {
            var affiliate = _liveoAffiliateService.Get(affiliateId);
            if (affiliate == null)
                return HttpNotFound();

            if (!Services.Authorizer.Authorize(Permissions.ManageAffiliates))
                return new HttpUnauthorizedResult();

            // Validate form input
            var model = Services.ContentManager.UpdateEditor(affiliate, this);
            if (!ModelState.IsValid)
            {
                Services.TransactionManager.Cancel();
                // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
                return View((object)model);
            }

            _orchardServices.ContentManager.Publish(affiliate.ContentItem);

            Services.Notifier.Information(T("Your {0} has been saved.", affiliate.TypeDefinition.DisplayName));

            return this.RedirectLocal(returnUrl, Url.AffiliateEdit(affiliate));
        }

        [ValidateAntiForgeryTokenOrchard]
        public ActionResult Delete(int affiliateId)
        {
            //refactoring: test PublishBlogPost/PublishBlogPost in addition if published

            var affiliate = _liveoAffiliateService.Get(affiliateId);
            if (affiliate == null)
                return HttpNotFound();

            if (!Services.Authorizer.Authorize(Permissions.ManageAffiliates))
                return new HttpUnauthorizedResult();

            _liveoAffiliateService.Delete(affiliate);
            Services.Notifier.Information(T("Affiliate was successfully deleted"));

            return Redirect(Url.AffiliateForAdmin(affiliate.As<AffiliatePart>()));
        }

        public ActionResult List()
        {
            var list = _orchardServices.New.List();
            list.AddRange(_liveoAffiliateService.Get()
                              .Select(b =>
                              {
                                  var affiliate = _orchardServices.ContentManager.BuildDisplay(b, "SummaryAdmin");
                                  affiliate.TotalPostCount = _liveoAffiliateService.AffiliateCount();
                                  return affiliate;
                              }));

            dynamic viewModel = _orchardServices.New.ViewModel()
                .ContentItems(list);
            // Casting to avoid invalid (under medium trust) reflection over the protected View method and force a static invocation.
            return View((object)viewModel);
        }

        public new bool TryUpdateModel<TModel>(TModel model, string prefix, string[] includeProperties, string[] excludeProperties) where TModel : class
        {
            return base.TryUpdateModel(model, prefix, includeProperties, excludeProperties);
        }

        public void AddModelError(string key, LocalizedString errorMessage)
        {
            ModelState.AddModelError(key, errorMessage.ToString());
        }
    }

    public class FormValueRequiredAttribute : ActionMethodSelectorAttribute
    {
        private readonly string _submitButtonName;

        public FormValueRequiredAttribute(string submitButtonName)
        {
            _submitButtonName = submitButtonName;
        }

        public override bool IsValidForRequest(ControllerContext controllerContext, MethodInfo methodInfo)
        {
            var value = controllerContext.HttpContext.Request.Form[_submitButtonName];
            return !string.IsNullOrEmpty(value);
        }
    }
}