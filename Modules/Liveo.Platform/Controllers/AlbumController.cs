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
    public class AlbumController : Controller
    {
		//public ActionResult Index() {
		//	var viewModel = new AlbumIndexViewModel();
		//	return View(viewModel);
		//}

		//public ActionResult Item(int id) {
		//	var viewModel = new AlbumItemViewModel();
		//	return View(viewModel);
		//}

		public ActionResult Index()
		{
			return View();
		}
	}
}