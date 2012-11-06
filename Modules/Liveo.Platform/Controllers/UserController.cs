using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Models;
using Orchard.Themes;


namespace Liveo.Platform.Controllers
{
    [Themed]
    public class UserController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Profile()
        {
            return View();
        }

        public ActionResult Settings()
        {
            return View();
        }

        public ActionResult HealthProfile()
        {
            return View();
        }
    }
}