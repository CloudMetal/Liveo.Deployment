using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Liveo.Platform.Models
{
    using Liveo.Framework.Model;

    public class GalleryIndexViewModel
    {
        public IEnumerable<Album> Albums { get; set; }
    }
}