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
    public class LiveoProgramService : ProgramService, ILiveoProgramService
    {
        public LiveoProgramService(ILiveoProgramRepository repository) : base(repository) { }
    }
}