using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Orchard.ContentManagement;
using Orchard.Environment.Extensions;

namespace SpotifyWidget.Models
{
  [OrchardFeature("SpotifyWidget")]
  public class SpotifyWidgetPart : ContentPart<SpotifyWidgetRecord>
  {
    [Required]
    public string Uri
    {
      get { return Record.Uri; }
      set { Record.Uri = value; }
    }

    public string Theme
    {
      get { return Record.Theme; }
      set { Record.Theme = value; }
    }

    public string ViewType
    {
      get { return Record.ViewType; }
      set { Record.ViewType = value; } 
    }

    [Range(250, 640)]
    public int? Width
    {
      get { return Record.Width; }
      set { Record.Width = value; }
    }

    [Range(80, 720)]
    public int? Height
    {
      get { return Record.Height; }
      set { Record.Height = value; }
    }

    public IEnumerable<SelectListItem> ThemeOptions
    {
      get
      {
        return new SelectListItem[] {
          new SelectListItem() { Value = "black", Text="Black", Selected = this.Theme == "black" },
          new SelectListItem() { Value = "white", Text="White", Selected = this.Theme == "white" }
        };
      }
    }

    public IEnumerable<SelectListItem> ViewOptions
    {
      get
      {
        return new SelectListItem[] {
          new SelectListItem() { Value = "list", Text="List", Selected = this.ViewType == "list" },
          new SelectListItem() { Value = "coverart", Text="Coverart", Selected = this.ViewType == "coverart" }
        };
      }
    }
  }
}