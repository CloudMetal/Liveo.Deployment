using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Platform.Models;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;

namespace Liveo.Platform.Handlers
{
    public class AffiliateHandler : ContentHandler
    {
        public AffiliateHandler(IRepository<AffiliateRecord> repository)
        {
            Filters.Add(StorageFilter.For(repository));
        }
    }
}