using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;
using Orchard.Environment.Extensions;
using SpotifyWidget.Models;

namespace SpotifyWidget.Drivers
{
  [OrchardFeature("SpotifyWidget")]
  public class SpotifyWidgetDriver : ContentPartDriver<SpotifyWidgetPart>
  {
    protected override string Prefix
    {
      get
      {
        return "spotify";
      }
    }

    protected override DriverResult Display(SpotifyWidgetPart part, string displayType, dynamic shapeHelper)
    {
      return ContentShape("Parts_SpotifyWidget", 
        () => shapeHelper.Parts_SpotifyWidget(
                Uri: part.Uri,
                Theme: part.Theme,
                ViewType: part.ViewType,
                Height: part.Height ?? 80,
                Width: part.Width ?? 250));
    }

    // GET
    protected override DriverResult Editor(SpotifyWidgetPart part, dynamic shapeHelper)
    {
      return ContentShape("Parts_SpotifyWidget_Edit",
        () => shapeHelper.EditorTemplate(
                TemplateName: "Parts/SpotifyWidget",
                Model: part,
                Prefix: Prefix));
    }

    // POST
    protected override DriverResult Editor(SpotifyWidgetPart part, IUpdateModel updater, dynamic shapeHelper)
    {
      updater.TryUpdateModel(part, Prefix, null, null);
      return Editor(part, shapeHelper);
    }
  }
}