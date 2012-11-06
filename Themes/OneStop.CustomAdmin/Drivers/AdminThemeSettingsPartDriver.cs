using Onestop.CustomAdmin.Models;
using Onestop.CustomAdmin.Services;
using Orchard.Caching;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;
using Orchard.Localization;

namespace Onestop.CustomAdmin.Drivers {
    public class AdminThemeSettingsPartDriver : ContentPartDriver<AdminThemeSettingsPart> {
        private const string TemplateName = "Parts/AdminThemeSettings";
        private readonly ISignals _signals;

        public AdminThemeSettingsPartDriver(ISignals signals) {
            T = NullLocalizer.Instance;
            _signals = signals;
        }

        public Localizer T { get; set; }

        protected override string Prefix { get { return "AdminThemeSettings"; } }

        protected override DriverResult Editor(AdminThemeSettingsPart part, dynamic shapeHelper) {
            return ContentShape("Parts_AdminThemeSettings_Edit",
                    () => shapeHelper.EditorTemplate(TemplateName: TemplateName, Model: part, Prefix: Prefix))
                    .OnGroup("AdminBranding");
        }

        protected override DriverResult Editor(AdminThemeSettingsPart part, IUpdateModel updater, dynamic shapeHelper) {
            return ContentShape("Parts_AdminThemeSettings_Edit", () => {
                    updater.TryUpdateModel(part, Prefix, null, null);
                    _signals.Trigger(AdminThemeSettingsService.ServiceSettingsCacheExpirationSignal);
                    return shapeHelper.EditorTemplate(TemplateName: TemplateName, Model: part, Prefix: Prefix);
                })
                .OnGroup("AdminBranding");
        }
    }
}