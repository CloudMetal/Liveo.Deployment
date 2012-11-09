using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Orchard;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;

namespace Liveo.Platform.Drivers
{
    public class LiveoUserPartDriver : ContentPartDriver<LiveoUserPart> {
        private readonly ILiveoUserService _liveoUserService;
        private readonly IOrchardServices _orchardServices;
        private readonly ILiveoPersonaService _personaService;

        public LiveoUserPartDriver(ILiveoUserService liveoUserService,
            ILiveoPersonaService personaService,
            IOrchardServices orchardServices) {
            _liveoUserService = liveoUserService;
            _orchardServices = orchardServices;
            _personaService = personaService;
        }
        protected override string Prefix
        {
            get { return "LiveoUser"; }
        }

        protected override DriverResult Editor(LiveoUserPart part, dynamic shapeHelper) {
            part.User = _liveoUserService.GetById(part.UserId);
            return ContentShape("Parts_LiveoUser_Edit", () => shapeHelper.EditorTemplate(TemplateName: "Parts/LiveoUser", Model: part, Prefix: Prefix));
        }

        protected override DriverResult Editor(LiveoUserPart part, IUpdateModel updater, dynamic shapeHelper)
        {
            if (updater.TryUpdateModel(part, Prefix, null, null)) {
                // now update the underlying user...
                var user = _liveoUserService.GetById(part.UserId);
                if (user != null) {
                    if (user.Name != part.User.Name) {
                        user.Name = part.User.Name;
                        _liveoUserService.Save(user);
                        part.User = user;
                    }
                } else {
                    // create the user...
                    user = new User();
                    user.UserName = part.Email;
                    user.CreateDate = DateTime.UtcNow;
                    user.LastUpdateDate = user.CreateDate;
                    user.Email = user.UserName;
                    user.Password = "Password";
                    user.PasswordFormat = 0;
                    user.LoweredEmail = user.Email;

                    _liveoUserService.Add(user);

                    part.UserId = user.Id;
                    part.User = user;

                    var rootPersona = _personaService.GetPersonaByName("User");
                    var userPersona = new UserPersona();
                    userPersona.PersonaId = rootPersona.Id;
                    userPersona.UserId = part.UserId;
                    _personaService.Save(rootPersona);

                    _orchardServices.ContentManager.Publish(part.ContentItem);
                }
            }
            return Editor(part, shapeHelper);
        }
    }
}