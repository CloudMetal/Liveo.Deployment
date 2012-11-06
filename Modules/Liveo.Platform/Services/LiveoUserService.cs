using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Data;
using Liveo.Platform.Models;
using Orchard;
using Orchard.Security;
using Orchard.Services;
using Orchard.Users.Models;

namespace Liveo.Platform.Services
{
    public class LiveoUserService : UserService, ILiveoUserService
    {
        private readonly IOrchardServices _orchardServices;
        private readonly IMembershipService _membershipService;
        private readonly IClock _clock;
        private readonly ILiveoRoleService _roleService;

        public LiveoUserService(ILiveoUserRepository repository, IOrchardServices orchardServices,
            IMembershipService membershipService, IClock clock,
            ILiveoRoleService roleService) : base(repository) {
            _clock = clock;
            _roleService = roleService;
            _membershipService = membershipService;
            _orchardServices = orchardServices;
        }

        public override void Add(User entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress)) {
                base.Add(entity);
                scope.Complete();
            }
        }

        public override void Save(User entity)
        {
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress))
            {
                base.Save(entity);
                scope.Complete();
            }
        }

        public override User GetById(int id) {
            User user = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress)) {
                user =  base.GetById(id);
            }
            return user;
        }

        public User GetUserByEmail(string email) {
            User user = null;
            using (var scope = new TransactionScope(TransactionScopeOption.Suppress)) {
                user = GetQuery().FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
            }
            return user;
        }
    }
}