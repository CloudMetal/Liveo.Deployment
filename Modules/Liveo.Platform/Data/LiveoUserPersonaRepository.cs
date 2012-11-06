using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Orchard;

namespace Liveo.Platform.Data
{
    public class LiveoUserPersonaRepository : UserPersonaRepository, ILiveoUserPersonaRepository
    {
        public LiveoUserPersonaRepository(ILiveoDataContext context) : base(context.Context)
        {
            
        }
    }
}