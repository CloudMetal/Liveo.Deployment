using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Liveo.Platform.Data
{
    using Liveo.Framework.Model;

    public class LiveoGoalTypeRepository : GoalTypeRepository, ILiveoGoalTypeRepository
    {
        public LiveoGoalTypeRepository(ILiveoDataContext dbContext)
            : base(dbContext.Context) {}
    }
}