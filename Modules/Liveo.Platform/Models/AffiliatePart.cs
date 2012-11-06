using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Orchard.ContentManagement;

namespace Liveo.Platform.Models
{
    public class AffiliatePart : ContentPart<AffiliateRecord>
    {
        public AffiliatePart() {
            Affiliate = new Affiliate();
        }
        public int AffiliateId {
            get { return Record.AffiliateId; }
            set { Record.AffiliateId = value; }
        }

        public Affiliate Affiliate { get; set; }
    }
}