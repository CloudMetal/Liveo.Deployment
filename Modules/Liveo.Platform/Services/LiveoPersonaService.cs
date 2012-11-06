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
    public class LiveoPersonaService : PersonaService, ILiveoPersonaService
    {
        public LiveoPersonaService(ILiveoPersonaRepository repository) : base(repository) {}

        public Persona GetPersonaByName(string name) {
            Persona persona = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress)) {
                persona = GetQuery().FirstOrDefault(p => p.Name == name);
            }
            return persona;
        }

        public override void Add(Persona entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Add(entity);
                scope.Complete();
            }
        }

        public override void Save(Persona entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Save(entity);
                scope.Complete();
            }
        }

        public override Persona GetById(int id)
        {
            Persona user = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                user = base.GetById(id);
            }
            return user;
        }
    }
}