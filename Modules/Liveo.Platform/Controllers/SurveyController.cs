using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Orchard;
using Orchard.DisplayManagement;
using Orchard.Localization;
using Orchard.Mvc;
using Orchard.Themes;

namespace Liveo.Platform.Controllers
{
    [Themed]
    public class SurveyController : Controller {
        private readonly IOrchardServices _orchardServices;
        private readonly ILiveoSurveyService _surveyService;

        dynamic Shape { get; set; }
        public Localizer T { get; set; }

        public SurveyController(IShapeFactory shapeFactory,
            IOrchardServices orchardServices,
            ILiveoSurveyService surveyService) {
            Shape = shapeFactory;
            _orchardServices = orchardServices;
            _surveyService = surveyService;
        }

        public ActionResult Index() {
            return View();
        }

        [ActionName("Start")]
        public ActionResult StartSurvey(int id) {
            
            return View();
        }

		public ActionResult SurveyPrograms()
		{
			return View();
		}

        public ActionResult Page(int index) {
            var part = _surveyService.GetRegistrationSurvey();

            dynamic shape = _orchardServices.ContentManager.BuildDisplay(part);
            return new ShapePartialResult(this, shape);
        }
    }
}