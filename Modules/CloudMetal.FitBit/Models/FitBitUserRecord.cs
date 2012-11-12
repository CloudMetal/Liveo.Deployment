using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Records;

namespace CloudMetal.FitBit.Models
{
    public class FitBitUserRecord : ContentPartRecord
    {
        public virtual string Email { get; set; }
        public virtual string OAuthToken { get; set; }
    }
}