using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudMetal.FitBit.Models;
using Orchard;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;
using Orchard.Localization;

namespace CloudMetal.FitBit.Drivers
{
    public class OAuthSettingsPartDriver : ContentPartDriver<OAuthSettingsPart>
    {
        private const string TemplateName = "Parts/OAuthSettings";
        private readonly IWorkContextAccessor _workContextAccessor;
        public OAuthSettingsPartDriver(IWorkContextAccessor workContextAccessor)
        {
            _workContextAccessor = workContextAccessor;
            T = NullLocalizer.Instance;
        }

        public Localizer T { get; set; }

        protected override string Prefix { get { return "OAuthSettings"; } }

        protected override DriverResult Editor(OAuthSettingsPart part, dynamic shapeHelper)
        {
            return ContentShape("Parts_OAuthSettings_Edit",
                    () => shapeHelper.EditorTemplate(TemplateName: TemplateName, Model: part, Prefix: Prefix))
                    .OnGroup("fitbit");
        }

        protected override DriverResult Editor(OAuthSettingsPart part, IUpdateModel updater, dynamic shapeHelper)
        {
            return ContentShape("Parts_OAuthSettings_Edit", () =>
            {
                updater.TryUpdateModel(part, Prefix, null, null);
                return shapeHelper.EditorTemplate(TemplateName: TemplateName, Model: part, Prefix: Prefix);
            })
                .OnGroup("fitbit");
        }
    }
}