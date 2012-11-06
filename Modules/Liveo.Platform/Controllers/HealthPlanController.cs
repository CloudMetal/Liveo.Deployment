using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Liveo.Platform.ViewModels;
using Orchard.Themes;

namespace Liveo.Platform.Controllers
{
    [Themed]
    public class HealthPlanController : Controller
    {
		//public ActionResult Index() {
		//	var viewModel = new HealthPlanIndexViewModel();
		//	return View(viewModel);
		//}

		public ActionResult Index()
		{
			return View();
		}
	}
}