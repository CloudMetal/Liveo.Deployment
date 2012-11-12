using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudMetal.FitBit.Models;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;
using Orchard.Localization;
using Orchard.Logging;

namespace CloudMetal.FitBit.Handlers
{
    public class FitBitUserHandler : ContentHandler
    {
        public FitBitUserHandler(IRepository<FitBitUserRecord> repository) {
            Filters.Add(StorageFilter.For(repository));
            Filters.Add(new ActivatingFilter<FitBitUserPart>("User"));
        }

        public new ILogger Logger { get; set; }
        public Localizer T { get; set; }
    }
}