using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Orchard;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;
using Orchard.Users.Models;

namespace Liveo.Platform.Handlers
{
    public class LiveoUserHandler : ContentHandler {
        private readonly ILiveoUserService _liveoUserService;
        private readonly IOrchardServices _orchardServices;
        private readonly ILiveoPersonaService _personaService;
        private readonly ILiveoPersonaUserService _liveoPersonaUserService;
        public LiveoUserHandler(IRepository<LiveoUserRecord> repository, 
            ILiveoUserService liveoUserService,
            IOrchardServices orchardServices,
            ILiveoPersonaService personaService,
            ILiveoPersonaUserService liveoPersonaUserService) {
            Filters.Add(StorageFilter.For(repository));
            _liveoUserService = liveoUserService;
            _orchardServices = orchardServices;
            _personaService = personaService;
            _liveoPersonaUserService = liveoPersonaUserService;

            OnCreated<UserPart>((context, part) => {
                                    var liveoUser = part.As<LiveoUserPart>();
                if (liveoUser != null) {
                    // ensure created user...
                    var user = _liveoUserService.GetById(liveoUser.UserId);
                    if (user != null) {
                        liveoUser.User = user;
                    }
                    if (user == null && !string.IsNullOrEmpty(part.Email)) {
                        user = _liveoUserService.GetUserByEmail(part.Email);

                        if (user == null) {
                            user = new User();
                            user.UserName = part.Email;
                            user.CreateDate = DateTime.UtcNow;
                            user.LastUpdateDate = user.CreateDate;
                            user.Email = user.UserName;
                            user.Password = "Password";
                            user.PasswordFormat = 0;
                            user.LoweredEmail = user.Email;

                            _liveoUserService.Add(user);
                        }

                        liveoUser.UserId = user.Id;
                        liveoUser.User = user;

                        var rootPersona = _personaService.GetPersonaByName("User");
                        var userPersona = new UserPersona();
                        userPersona.PersonaId = rootPersona.Id;
                        userPersona.UserId = user.Id;
                        _personaService.Save(rootPersona);

                        _orchardServices.ContentManager.Publish(part.ContentItem);

                        _orchardServices.ContentManager.Publish(liveoUser.ContentItem);
                    }
                }
                                });

            OnLoaded<UserPart>((context, part) => {
                                   var liveoUser = part.As<LiveoUserPart>();
                if (liveoUser != null) {
                    // ensure created user when module might have been disabled, etc...
                    // ensure created user...
                    var user = _liveoUserService.GetById(liveoUser.UserId);
                    if (user != null) {
                        liveoUser.User = user;
                    }
                    if (user == null && !string.IsNullOrEmpty(part.Email))
                    {
                        user = new User();
                        user.UserName = part.Email;
                        user.CreateDate = DateTime.UtcNow;
                        user.LastUpdateDate = user.CreateDate;
                        user.Email = user.UserName;
                        user.Password = "Password";
                        user.PasswordFormat = 0;
                        user.LoweredEmail = user.Email;

                        _liveoUserService.Add(user);

                        liveoUser.UserId = user.Id;

                        var rootPersona = _personaService.GetPersonaByName("User");
                        var userPersona = new UserPersona();
                        userPersona.PersonaId = rootPersona.Id;
                        userPersona.UserId = user.Id;
                        _personaService.Save(rootPersona);

                        _orchardServices.ContentManager.Publish(liveoUser.ContentItem);
                    }
                }
                               });
        }
    }
}