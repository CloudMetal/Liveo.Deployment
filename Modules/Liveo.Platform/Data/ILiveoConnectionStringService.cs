using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CloudMetal.Core.Data.Configuration;
using Orchard;

namespace Liveo.Platform.Data
{
    public interface ILiveoConnectionStringService : IConnectionStringService, IDependency
    {
    }
}
