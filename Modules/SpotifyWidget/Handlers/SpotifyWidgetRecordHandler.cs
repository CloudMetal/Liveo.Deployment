using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;
using Orchard.Environment.Extensions;
using SpotifyWidget.Models;

namespace SpotifyWidget.Handlers
{
  [OrchardFeature("SpotifyWidget")]
  public class SpotifyWidgetRecordHandler : ContentHandler
  {
    public SpotifyWidgetRecordHandler(IRepository<SpotifyWidgetRecord> repository)
    {
      Filters.Add(StorageFilter.For(repository));
    }
  }
}