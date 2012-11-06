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
    public class LiveoAnswerSelectionService : AnswerSelectionService, ILiveoAnswerSelectionService
    {
        public LiveoAnswerSelectionService(ILiveoAnswerSelectionRepository repository) : base(repository) {}

        public override void Add(AnswerSelection entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Add(entity);
                scope.Complete();
            }
        }

        public override void Save(AnswerSelection entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Save(entity);
                scope.Complete();
            }
        }

        public override void Delete(AnswerSelection entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Delete(entity);
                scope.Complete();
            }
        }

        public override AnswerSelection GetById(int id)
        {
            AnswerSelection entity = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                entity = base.GetById(id);
            }
            return entity;
        }
    }
}