using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Platform.Models;
using Liveo.Platform.Services;
using Liveo.Platform.ViewModels;
using Orchard;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;
using Orchard.Users.Models;

namespace Liveo.Platform.Drivers
{
    public class GoalListPartDriver : ContentPartDriver<GoalListPart> {
        //private readonly ILiveoGoalService _goalService;
        private readonly IOrchardServices _orchardServices;
        private readonly IWorkContextAccessor _workContextAccessor;
        public GoalListPartDriver(ILiveoGoalService goalService,
            IOrchardServices orchardServices,
            IWorkContextAccessor workContextAccessor) {
            _orchardServices = orchardServices;
            _workContextAccessor = workContextAccessor;
        }

        protected override DriverResult Display(GoalListPart part, string displayType, dynamic shapeHelper) {
            return ContentShape("Parts_GoalList", () =>
            {
                                        var user = _workContextAccessor.GetContext().CurrentUser;
                                        LiveoUserPart liveoUserPart = null;
                                        //IEnumerable<Goal> goals = null;
                if (user != null) {
                    var userItem = _orchardServices.ContentManager.Get(user.ContentItem.Id);
                    var userPart = userItem.As<UserPart>();
                    liveoUserPart = userPart.As<LiveoUserPart>();
                }
                                        return shapeHelper.Parts_GoalList(Goal: part, LiveoUser: liveoUserPart);
                                    });
        }

        protected override DriverResult Editor(GoalListPart part, dynamic shapeHelper)
        {

            return ContentShape("Parts_GoalList_Edit",
                                () => shapeHelper.EditorTemplate(TemplateName: "Parts/GoalList", Model: part, Prefix: Prefix));
        }

        protected override DriverResult Editor(GoalListPart part, IUpdateModel updater, dynamic shapeHelper)
        {


            if (updater.TryUpdateModel(part, Prefix, null, null))
            {
                
                
            }

            return Editor(part, shapeHelper);
        }
    }
}