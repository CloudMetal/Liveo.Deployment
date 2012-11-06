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
    public class LiveoPersonaUserService : UserPersonaService, ILiveoPersonaUserService
    {
        public LiveoPersonaUserService(ILiveoUserPersonaRepository repository) : base(repository) {}

        public override void Add(UserPersona entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Add(entity);
                scope.Complete();
            }
        }

        public override void Save(UserPersona entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Save(entity);
                scope.Complete();
            }
        }

        public override UserPersona GetById(int id)
        {
            UserPersona user = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                user = base.GetById(id);
            }
            return user;
        }
    }
}