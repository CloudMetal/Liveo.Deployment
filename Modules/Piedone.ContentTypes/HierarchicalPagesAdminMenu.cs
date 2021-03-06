﻿using Orchard.Environment.Extensions;
using Orchard.Localization;
using Orchard.UI.Navigation;

namespace Piedone.ContentTypes
{
    [OrchardFeature("Piedone.ContentTypes.HierarchicalPages")]
    public class HierarchicalPagesAdminMenu : INavigationProvider
    {
        public Localizer T { get; set; }
        public string MenuName { get { return "admin"; } }

        public void GetNavigation(NavigationBuilder builder)
        {
            builder.AddImageSet("hierarchical-page");
        }
    }
}