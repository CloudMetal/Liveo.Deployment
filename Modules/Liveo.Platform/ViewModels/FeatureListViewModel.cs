using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.ViewModels
{
    public class FeatureSearchViewModel {
        public string Expression { get; set; }
    
    }
    public class FeatureListViewModel
    {
        public IList<Feature> Features { get; set; }
        public dynamic Pager { get; set; }
        public FeatureSearchViewModel Search { get; set; }

        public FeatureListViewModel(IList<Feature> features, FeatureSearchViewModel search, dynamic pager ) {
            Features = features;
            Search = search;
            Pager = pager;
        }
    }
}