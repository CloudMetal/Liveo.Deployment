using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using Orchard.ContentManagement;

namespace CloudMetal.FitBit.Models
{
    public class OAuthSettingsPart : ContentPart<OAuthSettingsRecord>
    {
        [DisplayName("Consumer Key")]
        public string ConsumerKey {
            get { return Record.ConsumerKey; }
            set { Record.ConsumerKey = value; }
        }

        [DisplayName("Consumer Secret")]
        public string ConsumerSecret {
            get { return Record.ConsumerSecret; }
            set { Record.ConsumerSecret = value; }
        }
    }
}