using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Records;
using Orchard.Environment.Extensions;

namespace SpotifyWidget.Models
{
  [OrchardFeature("SpotifyWidget")]
  public class SpotifyWidgetRecord : ContentPartRecord
  {
    public virtual string Uri { get; set; }
    public virtual string Theme { get; set; }
    public virtual string ViewType { get; set; }
    public virtual int? Width { get; set; }
    public virtual int? Height { get; set; }
  }
}