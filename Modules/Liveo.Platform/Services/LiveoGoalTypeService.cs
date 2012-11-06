using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Liveo.Platform.Services
{
    using Liveo.Framework.Model;
    using Liveo.Framework.Model.Service;
    using Liveo.Platform.Data;

    public class LiveoGoalTypeService : GoalTypeService, ILiveoGoalTypeService
    {
        public LiveoGoalTypeService(ILiveoGoalTypeRepository repository)
            : base(repository) {}
    }
}