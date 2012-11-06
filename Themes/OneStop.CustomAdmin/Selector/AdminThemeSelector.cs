using System.Web.Routing;
using Orchard.Themes;
using Orchard.UI.Admin;

namespace Onestop.CustomAdmin.Selector {
    public class AdminThemeSelector : IThemeSelector {
        public ThemeSelectorResult GetTheme(RequestContext context) {
            if (AdminFilter.IsApplied(context)) {
                return new ThemeSelectorResult { Priority = 101, ThemeName = "Onestop.CustomAdmin" };
            }

            return null;
        }
    }
}