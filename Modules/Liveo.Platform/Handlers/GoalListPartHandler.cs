using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Platform.Models;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;

namespace Liveo.Platform.Handlers
{
    public class GoalListPartHandler : ContentHandler
    {
        public GoalListPartHandler(IRepository<GoalListRecord> repository) {
            Filters.Add(StorageFilter.For(repository));
        }
    }
}