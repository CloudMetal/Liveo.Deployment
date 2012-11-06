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
	public class GroupsController : Controller
	{
		//
		// GET: /Groups/

		public ActionResult Index()
		{
			return View();
		}

		public ActionResult GroupSearchAdd()
		{
			return View();
		}

		public ActionResult GroupPrivateNotification()
		{
			return View();
		}

		public ActionResult GroupViewMain()
		{
			return View();
		}

		public ActionResult GroupViewMembers()
		{
			return View();
		}

		public ActionResult GroupEdit()
		{
			return View();
		}

		public ActionResult GroupViewPictures()
		{
			return View();
		}

		public ActionResult GroupAddAnouncement()
		{
			return View();
		}

		public ActionResult GroupInviteMembers()
		{
			return View();
		}

		public ActionResult GroupMySubscriptions()
		{
			return View();
		}
	}
}
