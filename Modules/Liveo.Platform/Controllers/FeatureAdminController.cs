using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Services;
using Liveo.Platform.ViewModels;
using Orchard.ContentManagement;
using Orchard.DisplayManagement;
using Orchard.DisplayManagement.Shapes;
using Orchard.Localization;
using Orchard.Settings;
using Orchard.UI.Admin;
using Orchard.UI.Navigation;
using Liveo.Platform.Extensions;

namespace Liveo.Platform.Controllers
{
    [ValidateInput(false), Admin]
    public class FeatureAdminController : Controller, IUpdateModel {
        private readonly ILiveoFeatureService _featureService;
        private readonly ISiteService _siteService;
        private dynamic Shape { get; set; }
        private Localizer T { get; set; }

        public FeatureAdminController(ILiveoFeatureService featureService,
            ISiteService siteService,
            IShapeFactory shapeFactory) {
            _featureService = featureService;
            _siteService = siteService;
            Shape = shapeFactory;
        }
        public ActionResult List(PagerParameters pagerParameters, FeatureSearchViewModel search) {
            var featureQuery = _featureService.GetQuery();

            if (!string.IsNullOrWhiteSpace(search.Expression)) {
                string expression = search.Expression.Trim();

                featureQuery = featureQuery.Where(feature => feature.Name.Contains(expression, StringComparison.InvariantCultureIgnoreCase));
            }

            // The pager is used to apply paging on the query and to create a PagerShape
            var pager = new Pager(_siteService.GetSiteSettings(), pagerParameters.Page, pagerParameters.PageSize);

            // Construct a Pager shape
            var pagerShape = Shape.Pager(pager).TotalItemCount(featureQuery.Count());

            // Create the viewmodel
            var model = new FeatureListViewModel(featureQuery.ToList(), search, pagerShape);
            return View(model);
        }

        public new bool TryUpdateModel<TModel>(TModel model, string prefix, string[] includeProperties, string[] excludeProperties) where TModel : class
        {
            return base.TryUpdateModel(model, prefix, includeProperties, excludeProperties);
        }

        public void AddModelError(string key, LocalizedString errorMessage)
        {
            ModelState.AddModelError(key, errorMessage.Text);
        }
    }
}