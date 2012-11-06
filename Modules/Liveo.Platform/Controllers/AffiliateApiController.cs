using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Services;

namespace Liveo.Platform.Controllers
{
    public class AffiliateApiController : Liveo.WebApi.Controllers.AffiliateController
    {
        public AffiliateApiController(ILiveoAffiliateService service) : base(service) {}
    }
}