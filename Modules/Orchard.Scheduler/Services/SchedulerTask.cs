using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.Tasks;
using Orchard.Scheduler.Models;
using Orchard.Data;
using Orchard.Services;
using Orchard.Rules.Services;
using NCrontab;
using Orchard.Logging;
using Orchard.Reports.Services;

namespace Orchard.Scheduler.Services
{
    public class SchedulerTask : Component, IBackgroundTask
    {
        private readonly IRepository<ScheduleRecord> _repository;
        private readonly IClock _clock;
        private readonly IRulesManager _rulesManager;
        private readonly IReportsCoordinator _reportsCoordinator;

        public SchedulerTask(IRepository<ScheduleRecord> repository, 
            IClock clock,
            IRulesManager rulesManager,
            IReportsCoordinator reportsCoordinator)
        {
            _repository = repository;            
            _clock = clock;
            _rulesManager = rulesManager;
            _reportsCoordinator = reportsCoordinator;
        }

        public void Sweep()
        {
            var now = _clock.UtcNow;            
            var records = _repository.Fetch(x => x.Enabled && x.StartDateUtc <= now && x.NextOccurrenceUtc <= now);
            Logger.Debug("Orchard.Scheduler.SchedulerTask found {0} rows at {1}", records.Count(), now);
            
            foreach (var record in records)
            {
                try
                {                    
                    Logger.Debug("Orchard.Scheduler.SchedulerTask about to trigger schedule '{0}'", record.Name);
                    _rulesManager.TriggerEvent("Scheduler", "NamedEvent", () => new Dictionary<string, object> { { "Name", record.Name } });
                    _reportsCoordinator.Information("Scheduler", string.Format("Schedule event '{0}' triggered successfully", record.Name));

                    var cronTab = CrontabSchedule.Parse(record.CronExpression);
                    var nextOccurrence = record.EndDateUtc.HasValue ? cronTab.GetNextOccurrence(now, record.EndDateUtc.Value) : cronTab.GetNextOccurrence(now);

                    if (nextOccurrence != DateTime.MinValue)
                    {
                        record.NextOccurrenceUtc = nextOccurrence.ToUniversalTime();
                        _repository.Update(record);
                    }

                    if (record.EndDateUtc.HasValue && record.EndDateUtc.Value <= now)
                    {
                        record.Enabled = false;
                        _repository.Update(record);
                    }
                }
                catch (Exception ex)
                {
                    _reportsCoordinator.Error("Scheduler", string.Format("Error triggering '{0}': {1}", record.Name, ex.Message));
                    Logger.Error(ex, "Exception occurred during triggering of schedule '{0}'", record.Name);
                }
            }            
        }
    }
}