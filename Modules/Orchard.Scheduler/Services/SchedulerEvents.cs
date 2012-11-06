using Orchard.Rules.Services;
using Orchard.Rules.Models;
using Orchard.Localization;

namespace Orchard.Scheduler.Services
{
    public class SchedulerEvents : IEventProvider
    {
        public SchedulerEvents()
        {
            T = NullLocalizer.Instance;
        }

        public Localizer T { get; set; }

        public void Describe(DescribeEventContext describe)
        {
            describe.For("Scheduler", T("Scheduler"), T("Scheduler"))
                .Element("NamedEvent", 
                            T("Schedule Events"), 
                            T("Choose from the list of pre-defined schedules"),
                            Condition,
                            Display, 
                            "SchedulerEventsForm");
        }

        private LocalizedString Display(EventContext context)
        {
            if (!context.Properties.ContainsKey("Name"))
            {
                return T("No Schedule selected");
            }

            return T("Rule will be triggered when the '{0}' schedule occurrs", context.Properties["Name"]);
        }

        private bool Condition(EventContext context)
        {
            if (!context.Properties.ContainsKey("Name") || !context.Tokens.ContainsKey("Name"))
            {
                return false;
            }

            return context.Properties["Name"] == (string)context.Tokens["Name"];
        }
    }
}