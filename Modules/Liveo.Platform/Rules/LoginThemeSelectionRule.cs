using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard;
using Orchard.Security;
using Vandelay.Industries.Services;

namespace Liveo.Platform.Rules
{
    public class LoginThemeSelectionRule : IThemeSelectionRule {
        private readonly IAuthenticationService _authenticationService;
        public LoginThemeSelectionRule(IAuthenticationService authenticationService) {
            _authenticationService = authenticationService;
        }
        public bool Matches(string name, string criterion) {
            var crit = Convert.ToBoolean(criterion);
            var currentUser = _authenticationService.GetAuthenticatedUser();
            var isLoggedIn = currentUser != null ? true : false;
            return crit == isLoggedIn;
        }
    }
}