using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Data;

namespace Liveo.Platform.Services
{
    public class LiveoFeatureService : FeatureService, ILiveoFeatureService
    {
        public LiveoFeatureService(ILiveoFeatureRepository repository) : base(repository) {}

        public Feature CreateFeature(string name, string url) {
            var feature = new Feature();
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress)) {
                // try to find feature...
                var found = GetQuery().Where(f => f.Name == name);
                if (!found.Any()) {
                    feature = new Feature {Name = name, RelativeUrl = url};
                    Add(feature);
                    scope.Complete();
                } else {
                    throw new InvalidOperationException("Feature already defined.");
                }
            }
            return feature;
        }

        public IEnumerable<Feature> GetFeatures() {
            IEnumerable<Feature> features = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress)) {
                features = GetQuery().ToList();
            }
            return features;
        } 
    }
}