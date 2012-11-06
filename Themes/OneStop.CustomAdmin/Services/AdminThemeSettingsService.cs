using Onestop.CustomAdmin.Models;
using Orchard;
using Orchard.Caching;
using Orchard.ContentManagement;

namespace Onestop.CustomAdmin.Services {
    public class AdminThemeSettingsService : IAdminThemeSettingsService {
        public static readonly string ServiceSettingsCacheKey = "Onestop.AdminThemeSettingsService";
        public static readonly string ServiceSettingsCacheExpirationSignal = "Onestop.AdminThemeSettingsService.Changed";

        private readonly IWorkContextAccessor _wca;
        private readonly ICacheManager _cacheManager;
        private readonly ISignals _signals;

        public AdminThemeSettingsService(IWorkContextAccessor wca, ICacheManager cacheManager, ISignals signals) {
            _wca = wca;
            _cacheManager = cacheManager;
            _signals = signals;
        }

        public AdminThemeSettingsPart GetServiceSettings() {
            return _cacheManager.Get(
                ServiceSettingsCacheKey,
                ctx => {
                    ctx.Monitor(_signals.When(ServiceSettingsCacheExpirationSignal));
                    return _wca.GetContext().CurrentSite.ContentItem.As<AdminThemeSettingsPart>();
                });
        }
    }
}