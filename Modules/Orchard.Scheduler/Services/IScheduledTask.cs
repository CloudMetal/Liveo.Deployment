using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NCrontab;

namespace Orchard.Scheduler.Services
{
    public enum ExpressionSegment
    {
        Minute,
        Hour,
        DayOfMonth,
        Month,
        DayOfWeek
    }

    public interface IScheduledTask : IDependency
    {
        IDictionary<ExpressionSegment, string> Expression { get; }
        void Execute();
    }
}
