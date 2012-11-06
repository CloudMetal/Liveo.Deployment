using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Data;
using Liveo.Platform.Models;
using Orchard.ContentManagement;
using Orchard.Core.Common.Models;
using Orchard.Core.Title.Models;

namespace Liveo.Platform.Services
{
    public class LiveoSurveyService : SurveyService, ILiveoSurveyService {
        private ILiveoSystemInstallationService _installationService;
        private readonly IContentManager _contentManager;
        public LiveoSurveyService(ILiveoSurveyRepository repository,
            ILiveoSystemInstallationService installationService,
            IContentManager contentManager) : base(repository) {
            _installationService = installationService;
            _contentManager = contentManager;
        }

        public SurveyPart GetRegistrationSurvey() {
            return null;
        }


        public IQueryable<SurveyQuestion> Questions
        {
            get { return Repository.GetQuery<SurveyQuestion>(); }
        }


        public SurveyPart Get(int id)
        {
            var surveyPart = _contentManager.Get<SurveyPart>(id);
            if (surveyPart != null)
            {
                surveyPart.Survey = GetById(surveyPart.SurveyId);
            }
            return surveyPart;
        }

        public override void Add(Survey entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Add(entity);
                scope.Complete();
            }
        }

        public override void Save(Survey entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Save(entity);
                scope.Complete();
            }
        }

        public override void Delete(Survey entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Delete(entity);
                scope.Complete();
            }
        }

        public override Survey GetById(int id)
        {
            Survey entity = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                entity = base.GetById(id);
            }
            return entity;
        }


        public SurveyPart CreatePart(SurveyPart part)
        {
            var title = part.As<TitlePart>();
            var body = part.As<BodyPart>();

            var innerSurvey = part.Survey;
            innerSurvey.Name = title.Title;
            innerSurvey.HtmlContent = body.Text;

            part.Survey = innerSurvey;

            Add(innerSurvey);

            part.SurveyId = innerSurvey.Id;

            _contentManager.Create(part.ContentItem);

            return part;
        }

        public void UpdatePart(SurveyPart part)
        {
            _contentManager.Publish(part.ContentItem);

            var title = part.As<TitlePart>();
            var body = part.As<BodyPart>();

            // update the survey...
            part.Survey.Name = title.Title;
            part.Survey.HtmlContent = body.Text;

            Save(part.Survey);
        }

        public void DeletePart(SurveyPart part) {
            _contentManager.Remove(part.ContentItem);

            // kill the survey...
            Delete(part.Survey);
        }


        public IQueryable<QuestionType> QuestionTypes
        {
            get { return Repository.GetQuery<QuestionType>(); }
        }
    }
}