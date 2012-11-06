using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Data;
using Orchard;

namespace Liveo.Platform.Services
{
    public interface ILiveoGoalService : IGoalService, IDependency {
        
    }

    public class LiveoGoalService : GoalService, ILiveoGoalService
    {
        public LiveoGoalService(ILiveoGoalRepository repository) : base(repository) {}
    }
}