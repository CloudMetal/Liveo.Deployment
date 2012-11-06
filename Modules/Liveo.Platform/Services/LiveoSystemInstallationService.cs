using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Data;

namespace Liveo.Platform.Services
{
    public class LiveoSystemInstallationService : SystemInstallationService, ILiveoSystemInstallationService
    {
        public LiveoSystemInstallationService(ILiveoSystemInstallationRepository repository) : base(repository) {}
    }
}