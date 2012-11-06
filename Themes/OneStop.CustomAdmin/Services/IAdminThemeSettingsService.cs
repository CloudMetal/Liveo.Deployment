using Onestop.CustomAdmin.Models;
using Orchard;

namespace Onestop.CustomAdmin.Services {
    public interface IAdminThemeSettingsService : IDependency {
        AdminThemeSettingsPart GetServiceSettings();
    }
}