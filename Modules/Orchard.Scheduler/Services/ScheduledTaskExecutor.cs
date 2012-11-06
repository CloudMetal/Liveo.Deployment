using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.Tasks;
using Orchard.Services;
using Orchard.Logging;
using Orchard.Reports.Services;
using NCrontab;

namespace Orchard.Scheduler.Services
{
    public class ScheduledTaskExecutor : Component, IBackgroundTask
    {
        private readonly IEnumerable<IScheduledTask> _scheduledTasks;
        private readonly IClock _clock;
        private readonly IReportsCoordinator _reportsCoordinator;
        private readonly IDictionary<Type, ValueOrError<CrontabSchedule>> _schedules;

        public ScheduledTaskExecutor(IClock clock, 
            IEnumerable<IScheduledTask> scheduledTasks,
            IReportsCoordinator reportsCoordinator)
        {
            _clock = clock;
            _scheduledTasks = scheduledTasks ?? Enumerable.Empty<IScheduledTask>();
            _reportsCoordinator = reportsCoordinator;

            _schedules = new Dictionary<Type, ValueOrError<CrontabSchedule>>();
            CreateSchedules();
        }

        public void Sweep()
        {            
            foreach (var task in _scheduledTasks)
            {
                try
                {
                    var schedule = _schedules[task.GetType()];
                    if (!schedule.IsError)
                    {
                        var now = _clock.UtcNow;
                        var nextOccurrence = schedule.Value.GetNextOccurrence(now);
                        if (nextOccurrence <= now.AddMinutes(1))
                        {
                            task.Execute();
                            _reportsCoordinator.Information("IScheduledTask.Execute", task.GetType().FullName + " executed successfully");
                        }
                    }
                    else
                    {
                        _reportsCoordinator.Error("IScheduledTask.Execute", string.Format("Error executing {0}: {1}", task.GetType().FullName, schedule.Error.Message));
                        Logger.Error(schedule.Error, "Exception occurred during {0}.Execute()", task.GetType().FullName);
                    }
                }
                catch (Exception ex)
                {
                    _reportsCoordinator.Error("IScheduledTask.Execute", string.Format("Error executing {0}: {1}", task.GetType().FullName, ex.Message));
                    Logger.Error(ex, "Exception occurred during {0}.Execute()", task.GetType().FullName);
                }
            }
        }

        private void CreateSchedules()
        {
            foreach (var task in _scheduledTasks)
            {
                var expression = CreateExpression(task.Expression);
                _schedules.Add(task.GetType(), CrontabSchedule.TryParse(expression));
            }
        }

        private string CreateExpression(IDictionary<ExpressionSegment, string> expression)
        {
            var values = new List<string>();
            foreach (var segment in Enum.GetValues(typeof(ExpressionSegment)).Cast<ExpressionSegment>())
            {
                string value;
                if (expression.TryGetValue(segment, out value))
                {
                    values.Add(value);
                }
                else
                {
                    values.Add("*");
                }
            }
            return string.Join(" ", values.ToArray());
        }
    }
}