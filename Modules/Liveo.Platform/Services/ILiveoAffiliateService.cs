using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Models;
using Orchard;

namespace Liveo.Platform.Services
{
    public interface ILiveoAffiliateService : IAffiliateService, IDependency {
        IEnumerable<AffiliatePart> Get();
        AffiliatePart Get(int id);
        void Delete(AffiliatePart affiliatePart);
        int AffiliateCount();
    }
}
