using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.Localization;
using Orchard.UI.Navigation;

namespace Liveo.Platform.Navigation
{
    public class LiveoMenuProvider : IMenuProvider
    {
        public Localizer T { get; set; }

        public void GetMenu(Orchard.ContentManagement.IContent menu, NavigationBuilder builder)
        {
            builder.Add(T("Affiliate Home"), "2", item => item.Action("Index", "Affiliate", new { area = "Liveo.Platform" }));
            builder.Add(T("My Groups"), "2", item => item.Action("Index", "Groups", new { area = "Liveo.Platform" }));
            builder.Add(T("My Albums"), "2", item => item.Action("Index", "Album", new { area = "Liveo.Platform" }));
            //builder.Add(T("My Gallery"), "2", item => item.Action("Index", "Gallery", new { area = "Liveo.Platform" }));
            builder.Add(T("My Health Plan"), "2", item => item.Action("Index", "Fitness", new { area = "Liveo.Platform" }));
           // builder.Add(T("My Health Tracker"), "2", item => item.Action("Index", "Fitness", new { area = "Liveo.Platform" }));
        }
    }
}