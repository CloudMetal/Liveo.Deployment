using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Platform.Models;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;

namespace Liveo.Platform.Drivers
{
    public class MediaCollectionPartDriver : ContentPartDriver<MediaCollectionPart>
    {
        protected override DriverResult Display(MediaCollectionPart part, string displayType, dynamic shapeHelper)
        {
            return ContentShape("Parts_MediaCollection", () => shapeHelper.Parts_MediaCollection(MediaCollection: part));
        }

        protected override DriverResult Editor(MediaCollectionPart part, dynamic shapeHelper)
        {

            return ContentShape("Parts_MediaCollection_Edit",
                                () => shapeHelper.EditorTemplate(TemplateName: "Parts/MediaCollection", Model: part, Prefix: Prefix));
        }

        protected override DriverResult Editor(MediaCollectionPart part, IUpdateModel updater, dynamic shapeHelper)
        {


            if (updater.TryUpdateModel(part, Prefix, null, null))
            {


            }

            return Editor(part, shapeHelper);
        }
    }
}