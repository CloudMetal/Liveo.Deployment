using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Platform.Models;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;

namespace Liveo.Platform.Handlers
{
    public class MediaCollectionPartHandler : ContentHandler
    {
        public MediaCollectionPartHandler(IRepository<MediaCollectionPartRecord> repository)
        {
            Filters.Add(StorageFilter.For(repository));
        }
    }
}