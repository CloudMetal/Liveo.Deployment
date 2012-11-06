using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Orchard;

namespace Liveo.Platform.Services
{
    public interface ILiveoPersonaService : IPersonaService, IDependency {
        Persona GetPersonaByName(string name);
    }
}
