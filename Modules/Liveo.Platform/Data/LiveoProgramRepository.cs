using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.Data
{
    public class LiveoProgramRepository : ProgramRepository, ILiveoProgramRepository
    {
        public LiveoProgramRepository(ILiveoDataContext context) : base(context.Context) { }
    }
}