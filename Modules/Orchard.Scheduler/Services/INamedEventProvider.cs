using System.Collections.Generic;

namespace Orchard.Scheduler.Services
{
    public interface INamedEventProvider : IDependency
    {
        IEnumerable<string> GetNamedEvents();
    }
}
