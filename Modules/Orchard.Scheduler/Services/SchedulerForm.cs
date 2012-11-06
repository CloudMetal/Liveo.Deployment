using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.Forms.Services;
using Orchard.DisplayManagement;
using Orchard.Localization;
using System.Web.Mvc;
using Orchard.UI.Navigation;
using Orchard.Settings;
using Orchard.Mvc;

namespace Orchard.Scheduler.Services
{
    public class SchedulerForm : IFormProvider
    {
        private readonly INamedEventProvider _namedEventProvider;
        private readonly dynamic _shapeFactory;
        private readonly ISiteService _siteService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SchedulerForm(INamedEventProvider namedEventProvider, 
            IShapeFactory shapeFactory, 
            ISiteService siteService,
            IHttpContextAccessor httpContextAccessor)
        {
            _namedEventProvider = namedEventProvider;
            _shapeFactory = shapeFactory;
            _siteService = siteService;
            _httpContextAccessor = httpContextAccessor;
            T = NullLocalizer.Instance;
        }

        public Localizer T { get; set; }

        public void Describe(DescribeContext context)
        {
            context.Form("SchedulerEventsForm",
                shape =>
                {                    
                    return _shapeFactory.Form(
                        Id: "Schedule",
                        _Schedules: _shapeFactory.SelectTable(
                            Id: "Name", 
                            Name: "Name", 
                            Title: T("Schedules"),
                            Description: T("The Schedule that you would like to trigger the event"))
                            .AddRange(_namedEventProvider.GetNamedEvents().Select(x => new SelectListItem { Text = x, Value = x })));
                });
        }
    }
}