using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Data;
using Liveo.Platform.Models;
using Orchard.ContentManagement;
using Orchard.Core.Title.Models;

namespace Liveo.Platform.Services
{
    public class LiveoAffiliateService : AffiliateService, ILiveoAffiliateService {
        private readonly IContentManager _contentManager;
        public LiveoAffiliateService(ILiveoAffiliateRepository repository,
            IContentManager contentManager) : base(repository) {
            _contentManager = contentManager;
        }

        public IEnumerable<AffiliatePart> Get()
        {
            return _contentManager.Query<AffiliatePart, AffiliateRecord>(VersionOptions.Published)
                .Join<TitlePartRecord>()
                .OrderBy(br => br.Title)
                .List();
        }


        public AffiliatePart Get(int id) {
            var affiliatePart = _contentManager.Get<AffiliatePart>(id);
            if (affiliatePart != null) {
                affiliatePart.Affiliate = GetById(affiliatePart.AffiliateId);
            }
            return affiliatePart;
        }

        public int AffiliateCount() {
            return _contentManager.Query<AffiliatePart, AffiliateRecord>().Count();
        }


        public void Delete(AffiliatePart affiliatePart) {
            int id = affiliatePart.AffiliateId;
            _contentManager.Remove(affiliatePart.ContentItem);

            var affiliate = GetById(id);
            if (affiliate != null) {
                //Delete(affiliate);
            }
        }

        public override void Add(Affiliate entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Add(entity);
                scope.Complete();
            }
        }

        public override void Save(Affiliate entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Save(entity);
                scope.Complete();
            }
        }

        public override Affiliate GetById(int id)
        {
            Affiliate user = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                user = base.GetById(id);
            }
            return user;
        }
    }
}