using Orchard.ContentManagement;
using Orchard.ContentManagement.Records;

namespace Onestop.CustomAdmin.Models {
    public class AdminThemeSettingsPart : ContentPart<AdminThemeSettingsPartRecord> {
        public string LogoUrl {
            get { return Record.LogoUrl; }
            set { Record.LogoUrl = value; }
        }

        public string Brand {
            get { return Record.Brand; }
            set { Record.Brand = value; }
        }

        public string Welcome {
            get { return Record.Welcome; }
            set { Record.Welcome = value; }
        }
    }

    public class AdminThemeSettingsPartRecord : ContentPartRecord {
        public virtual string LogoUrl { get; set; }
        public virtual string Brand { get; set; }
        public virtual string Welcome { get; set; }
    }
}