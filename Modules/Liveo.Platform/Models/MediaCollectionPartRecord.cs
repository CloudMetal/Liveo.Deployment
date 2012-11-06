using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Records;

namespace Liveo.Platform.Models
{
    public class MediaCollectionPartRecord : ContentPartRecord
    {
        public virtual int MediaCollectionId { get; set; }
    }
}