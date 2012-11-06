using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using Orchard.ContentManagement;

namespace Liveo.Platform.Models
{
    public class MediaCollectionPart : ContentPart<MediaCollectionPartRecord>
    {
        [DisplayName("Media Collection ID")]
        public int MediaCollectionId {
            get { return Record.MediaCollectionId; }
            set { Record.MediaCollectionId = value; }
        }
    }
}