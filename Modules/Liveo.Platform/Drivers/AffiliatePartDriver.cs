using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Orchard;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;

namespace Liveo.Platform.Drivers
{
    public class AffiliatePartDriver : ContentPartDriver<AffiliatePart>
    {
        private readonly IOrchardServices _orchardServices;
        private readonly ILiveoAffiliateService _liveoAffiliateService;
        public AffiliatePartDriver(IOrchardServices orchardServices,
            ILiveoAffiliateService liveoAffiliateService)
        {
            _orchardServices = orchardServices;
            _liveoAffiliateService = liveoAffiliateService;
        }

        protected override string Prefix
        {
            get { return "Affiliate"; }
        }

        protected override DriverResult Editor(AffiliatePart part, dynamic shapeHelper)
        {
            part.Affiliate = _liveoAffiliateService.GetById(part.AffiliateId);
            return ContentShape("Parts_Affiliate_Edit", () => shapeHelper.EditorTemplate(TemplateName: "Parts/Affiliate", Model: part, Prefix: Prefix));
        }

        protected override DriverResult Editor(AffiliatePart part, IUpdateModel updater, dynamic shapeHelper)
        {
            if (updater.TryUpdateModel(part, Prefix, null, null))
            {
                // now update the underlying user...
                var affiliate = _liveoAffiliateService.GetById(part.AffiliateId);
                if (affiliate != null) {
                    part.Affiliate = affiliate;
                }
                else
                {
                    // create the user...
                    affiliate = new Affiliate();


                    _liveoAffiliateService.Add(affiliate);

                    part.AffiliateId = affiliate.Id;
                    part.Affiliate = affiliate;

                    _orchardServices.ContentManager.Publish(part.ContentItem);
                }
            }
            return Editor(part, shapeHelper);
        }
    }
}