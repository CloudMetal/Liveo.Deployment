using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Orchard;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;
using Orchard.Core.Common.Models;

namespace Liveo.Platform.Drivers
{
    public class SurveyPartDriver : ContentPartDriver<SurveyPart> {
        private readonly IOrchardServices _orchardServices;
        private readonly ILiveoSurveyService _liveoSurveyService;
        public SurveyPartDriver(IOrchardServices orchardServices,
            ILiveoSurveyService liveoSurveyService) {
            _orchardServices = orchardServices;
            _liveoSurveyService = liveoSurveyService;
        }

        protected override string Prefix
        {
            get { return "Survey"; }
        }

        protected override DriverResult Editor(SurveyPart part, dynamic shapeHelper)
        {
            part.Survey = _liveoSurveyService.GetById(part.SurveyId);
            return ContentShape("Parts_Survey_Edit", () => shapeHelper.EditorTemplate(TemplateName: "Parts/Survey", Model: part, Prefix: Prefix));
        }

        protected override DriverResult Editor(SurveyPart part, IUpdateModel updater, dynamic shapeHelper)
        {
            if (updater.TryUpdateModel(part, Prefix, null, null)) {
                
            }
            return Editor(part, shapeHelper);
        }
    }
}