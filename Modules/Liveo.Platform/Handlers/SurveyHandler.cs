using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;

namespace Liveo.Platform.Handlers
{
    public class SurveyHandler : ContentHandler {
        private readonly ILiveoSurveyService _liveoSurveyService;

        public SurveyHandler(IRepository<SurveyRecord> repository,
            ILiveoSurveyService surveyService) {
            Filters.Add(StorageFilter.For(repository));
            _liveoSurveyService = surveyService;

            OnLoaded<SurveyPart>((context, part) => {
                                     // load up the survey with it...
                                     part.Survey = _liveoSurveyService.GetById(part.SurveyId);
                                 });
        }
    }
}