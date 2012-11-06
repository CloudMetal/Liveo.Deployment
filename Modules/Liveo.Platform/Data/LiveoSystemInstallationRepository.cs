using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.Data
{
    public class LiveoSystemInstallationRepository : SystemInstallationRepository, ILiveoSystemInstallationRepository
    {
        public LiveoSystemInstallationRepository(ILiveoDataContext context) : base(context.Context) {}
    }
}