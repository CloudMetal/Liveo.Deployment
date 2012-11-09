using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Services;
using Liveo.Platform.Models;
using Orchard.Core.Settings.Models;
using Orchard.Localization;
using System.Security.Principal;

using System.Web.Security;
using Orchard;
using Orchard.Logging;
using Orchard.Mvc;
using Orchard.Mvc.Extensions;
using Orchard.Security;
using Orchard.Themes;
using Orchard.Users.Services;
using Orchard.ContentManagement;
using Orchard.Users.Models;
using Orchard.UI.Notify;
using Orchard.Users.Events;

using Orchard.Utility.Extensions;

namespace Liveo.Platform.Controllers
{
    using System.Web.Http;

    using Liveo.Platform.Services;

    [ValidateInput(false)]
    public class AccountApiController : ApiController
    {
        private readonly IMembershipService _membershipService;
        private readonly IOrchardServices _orchardServices;
        private readonly IAuthenticationService _authenticationService;


        public AccountApiController(
            IAuthenticationService authenticationService, 
            IMembershipService membershipService,
            IOrchardServices orchardServices,
            IEnumerable<IUserEventHandler> userEventHandlers) {
            _authenticationService = authenticationService;
            _membershipService = membershipService;
            _orchardServices = orchardServices;
        }

        public Liveo.Framework.Model.User Register(string userName, string email, string password)
        {
            var user = _membershipService.CreateUser(new CreateUserParams(userName, password, email, null, null, false));

            if (user != null)
            {
                if (user.As<UserPart>().RegistrationStatus == UserStatus.Pending)
                {
                    //return RedirectToAction(redirectUrl);
                }
                _authenticationService.SignIn(user, false /* createPersistentCookie */);
                var liveoUser = user.As<UserPart>().As<LiveoUserPart>().User;

                return liveoUser;
            }
            return null;
        }
    }
}