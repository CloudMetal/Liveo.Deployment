using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Orchard.Themes;

namespace Liveo.Platform.Controllers
{
	[Themed]
	public class FitnessController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateGoal()
        {
            return View();
        }

        public ActionResult CreateGoal_TEST()
        {
            return View();
        }

        public ActionResult EditPlan()
        {
            return View();
        }

        public ActionResult AddMeasurement()
        {
            return View();
        }

        
    }
}
