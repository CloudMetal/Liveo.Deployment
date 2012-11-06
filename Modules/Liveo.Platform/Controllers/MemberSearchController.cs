using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Orchard.Themes;

namespace Liveo.Platform.Controllers
{
    [Themed]
    public class MemberSearchController : Controller
    {
        public ActionResult Index() {
            return View();
        }
    }
}