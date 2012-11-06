using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.Localization;
using Orchard.UI.Navigation;

namespace Liveo.Platform
{
    public class AdminMenu : INavigationProvider
    {
        public string MenuName
        {
            get { return "admin"; }
        }

        public Localizer T { get; set; }

        public void GetNavigation(NavigationBuilder builder)
        {
            builder.AddImageSet("liveo")
                .Add(T("Liveo"), "1.5", BuildMenu);
        }

        private void BuildMenu(NavigationItemBuilder menu) {
            menu.Add(T("Manage Features"), "3",
                         item => item.Action("List", "FeatureAdmin", new { area = "Liveo.Platform" }).Permission(Permissions.ManageFeatures));
            menu.Add(T("Manage Affiliates"), "4",
                         item => item.Action("List", "AffiliateAdmin", new { area = "Liveo.Platform" }).Permission(Permissions.ManageAffiliates));
            menu.Add(T("Manage Surveys"), "5",
                         item => item.Action("List", "SurveyAdmin", new { area = "Liveo.Platform" }).Permission(Permissions.ManageSurveys));
        }
    }
}