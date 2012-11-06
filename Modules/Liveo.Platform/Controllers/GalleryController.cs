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
	public class GalleryController : Controller
	{
		//private readonly IAlbumService albumService;

		//public GalleryController(IAlbumService albumService)
		//{
		//	this.albumService = albumService;
		//}

		//
		// GET: /Gallery/

		//public ActionResult Index()
		//{
		//	var model = new GalleryIndexViewModel { Albums = this.albumService.GetQuery().ToList() };
		//	return View(model);
		//}


		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Album()
		{
			return View();
		}

		public ActionResult AlbumName()
		{
			return View();
		}

		public ActionResult MediaBrowse()
		{
			return View();
		}

		public ActionResult MediaUpload()
		{
			return View();
		}

		public ActionResult MediaView()
		{
			return View();
		}

		public ActionResult MediaEdit()
		{
			return View();
		}
	}
}
