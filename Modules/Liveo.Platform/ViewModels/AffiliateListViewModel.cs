using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.ViewModels
{
    public class AffiliateSearchViewModel {
        public string Expression { get; set; }
    
    }

    public class AffiliateListViewModel
    {
        public IList<Affiliate> Affiliates { get; set; }
        public dynamic Pager { get; set; }
        public AffiliateSearchViewModel Search { get; set; }

        public AffiliateListViewModel(IList<Affiliate> affiliates, AffiliateSearchViewModel search, dynamic pager)
        {
            Affiliates = affiliates;
            Search = search;
            Pager = pager;
        }
    }
}