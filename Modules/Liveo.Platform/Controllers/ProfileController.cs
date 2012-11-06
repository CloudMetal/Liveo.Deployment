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
    public class ProfileController : Controller
    {
        public ActionResult Index(int id) {
            var profile = new ProfileViewModel();
            return View(profile);
        }
    }
}