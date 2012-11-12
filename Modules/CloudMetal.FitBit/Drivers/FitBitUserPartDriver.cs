using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudMetal.FitBit.Models;
using Orchard;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;

namespace CloudMetal.FitBit.Drivers
{
    public class FitBitUserPartDriver : ContentPartDriver<FitBitUserPart> {
        private readonly IOrchardServices _orchardServices;
        public FitBitUserPartDriver(IOrchardServices orchardServices) {
            _orchardServices = orchardServices;
        }
        protected override string Prefix
        {
            get { return "FitBitUser"; }
        }

        protected override DriverResult Display(FitBitUserPart part, string displayType, dynamic shapeHelper)
        {
            return ContentShape("Parts_FitBitUser", () => shapeHelper.Parts_FitBitUser(
                FitBitUser: part));
        }

        protected override DriverResult Editor(FitBitUserPart part, dynamic shapeHelper)
        {
            return ContentShape("Parts_FitBitUser_Edit", () => shapeHelper.EditorTemplate(TemplateName: "Parts/FitBitUser", Model: part, Prefix: Prefix));
        }

        protected override DriverResult Editor(FitBitUserPart part, IUpdateModel updater, dynamic shapeHelper)
        {
            if (updater.TryUpdateModel(part, Prefix, null, null)) {
                
            }
            return Editor(part, shapeHelper);
        }
    }
}