using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Orchard;

namespace Liveo.Platform.Data
{
    public interface ILiveoDataContext
    {
        LiveoDataContext Context { get; }
    }
}
