using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Liveo.Platform.ViewModels;
using Orchard;
using Orchard.ContentManagement;
using Orchard.Core.Settings.Models;
using Orchard.Localization;
using Orchard.Mvc.Extensions;
using Orchard.Security;
using Orchard.Themes;
using Orchard.Users.Events;
using Orchard.Users.Models;
using Orchard.Users.Services;
using Orchard.Utility.Extensions;

namespace Liveo.Platform.Controllers
{
    [Themed]
    public class AccountController : Controller {
        private readonly IOrchardServices _orchardServices;
        private readonly IMembershipService _membershipService;
        private readonly IUserService _userService;
        private readonly IAuthenticationService _authenticationService;
        private readonly IEnumerable<IUserEventHandler> _userEventHandlers; 
        public AccountController(IOrchardServices orchardServices,
            IMembershipService membershipService,
            IUserService userService,
            IEnumerable<IUserEventHandler> userEventHandlers,
            IAuthenticationService authenticationService) {
            _orchardServices = orchardServices;
            _membershipService = membershipService;
            _userService = userService;
            _authenticationService = authenticationService;
            _userEventHandlers = userEventHandlers;
        }

        int MinPasswordLength
        {
            get
            {
                return _membershipService.GetSettings().MinRequiredPasswordLength;
            }
        }

        public Localizer T { get; set; }

        public ActionResult Index() {
            return View();
        }

        [AlwaysAccessible]
        public ActionResult Register() {
            return View();
        }

        [HttpPost, ActionName("Register")]
        [AlwaysAccessible]
        public ActionResult PostRegister(RegisterViewModel model) {
			return Redirect(Url.Action("RegisterComplete", "Account"));
			
			if (!ModelState.IsValid)
			{
                return View(model);
            }

            if (ValidateRegistration(model.Email, model.Password))
            {
                // Attempt to register the user
                // No need to report this to IUserEventHandler because _membershipService does that for us
                var user = _membershipService.CreateUser(new CreateUserParams(model.Email, model.Password, model.Email, null, null, false));

                if (user != null)
                {
                    if (user.As<UserPart>().EmailStatus == UserStatus.Pending)
                    {
                        var siteUrl = _orchardServices.WorkContext.CurrentSite.As<SiteSettings2Part>().BaseUrl;
                        if (String.IsNullOrWhiteSpace(siteUrl))
                        {
                            siteUrl = HttpContext.Request.ToRootUrlString();
                        }

                        _userService.SendChallengeEmail(user.As<UserPart>(), nonce => Url.MakeAbsolute(Url.Action("ChallengeEmail", "Account", new { Area = "Orchard.Users", nonce = nonce }), siteUrl));

                        foreach (var userEventHandler in _userEventHandlers)
                        {
                            userEventHandler.SentChallengeEmail(user);
                        }
                        return RedirectToAction("ChallengeEmailSent");
                    }

                    if (user.As<UserPart>().RegistrationStatus == UserStatus.Pending)
                    {
                        return RedirectToAction("RegistrationPending");
                    }

                    _authenticationService.SignIn(user, false /* createPersistentCookie */);
                    return Redirect(Url.Action("RegisterComplete", "Account"));
                }

                ModelState.AddModelError("_FORM", T(ErrorCodeToString(/*createStatus*/MembershipCreateStatus.ProviderError)));
            }
            return View(model);
        }

        public ActionResult RegisterComplete() {
            return View();
        }

        private bool ValidateRegistration(string email, string password)
        {
            bool validate = true;

            if (!Regex.IsMatch(email, UserPart.EmailPattern, RegexOptions.IgnoreCase))
            {
                // http://haacked.com/archive/2007/08/21/i-knew-how-to-validate-an-email-address-until-i.aspx    
                ModelState.AddModelError("email", T("You must specify a valid email address."));
                validate = false;
            }

            if (!validate)
                return false;

            if (password == null || password.Length < MinPasswordLength)
            {
                ModelState.AddModelError("password", T("You must specify a password of {0} or more characters.", MinPasswordLength));
            }
            
            return ModelState.IsValid;
        }

        private static string ErrorCodeToString(MembershipCreateStatus createStatus) {
            // See http://msdn.microsoft.com/en-us/library/system.web.security.membershipcreatestatus.aspx for
            // a full list of status codes.
            switch (createStatus) {
                case MembershipCreateStatus.DuplicateUserName:
                    return "Username already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A username for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return
                        "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return
                        "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return
                        "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }
    }
}