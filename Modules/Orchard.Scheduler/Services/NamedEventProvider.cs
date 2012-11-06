using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.Scheduler.Models;
using Orchard.Data;

namespace Orchard.Scheduler.Services
{
    public class NamedEventProvider : INamedEventProvider
    {
        private readonly IRepository<ScheduleRecord> _repository;

        public NamedEventProvider(IRepository<ScheduleRecord> repository)
        {
            _repository = repository;
        }

        public IEnumerable<string> GetNamedEvents()
        {
            return _repository.Fetch(x => x.Enabled).Select(x => x.Name);
        }
    }
}