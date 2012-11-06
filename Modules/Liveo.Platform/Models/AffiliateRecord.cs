using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Records;

namespace Liveo.Platform.Models
{
    public class AffiliateRecord : ContentPartRecord
    {
        public virtual int AffiliateId { get; set; }
    }
}