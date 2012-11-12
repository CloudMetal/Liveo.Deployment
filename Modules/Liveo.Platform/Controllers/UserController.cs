using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Models;
using Orchard;
using Orchard.Themes;
using Orchard.Users.Models;


namespace Liveo.Platform.Controllers
{
    [Themed]
    public class UserController : Controller {
        private readonly IWorkContextAccessor _workContextAccessor;
        public UserController(IWorkContextAccessor workContextAccessor) {
            _workContextAccessor = workContextAccessor;
        }
        public ActionResult Index()
        {
            return View();
        }

        [ActionName("Profile")]
        public ActionResult ShowProfile() {
            var userPart = _workContextAccessor.GetContext().CurrentUser as UserPart;
            
            return View(userPart);
        }

        public ActionResult Survey(int userId)
        {
            Session["CurrentUserId"] = userId;
            //ViewBag.UserId = userId;
            return View();
        }

        public ActionResult Settings()
        {
            var userPart = _workContextAccessor.GetContext().CurrentUser as UserPart;

            return View(userPart);
        }

        public ActionResult HealthProfile()
        {
            return View();
        }
    }
}