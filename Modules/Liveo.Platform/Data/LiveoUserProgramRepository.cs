using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.Data
{
    public class LiveoUserProgramRepository : UserProgramRepository, ILiveoUserProgramRepository
    {
        public LiveoUserProgramRepository(ILiveoDataContext dbContext) : base(dbContext.Context) {}
    }
}