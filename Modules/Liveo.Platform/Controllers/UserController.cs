﻿using System;
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

        [ActionName("Profile")]
        public ActionResult ShowProfile()
        {
            return View();
        }

        public ActionResult Survey(int userId)
        {
            ViewBag.UserId = userId;
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