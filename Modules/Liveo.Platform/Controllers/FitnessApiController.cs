using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Liveo.Platform.Controllers
{
    using System.Web.Http;

    using Liveo.Platform.Services;

    public class FitnessApiController : Liveo.WebApi.Controllers.FitnessController
    {
        public FitnessApiController(ILiveoGoalTypeService goalTypeService, ILiveoUnitTypeService unitTypeService, ILiveoChartTypeService chartTypeService)
            : base(goalTypeService, unitTypeService, chartTypeService) {}

        [ActionName("GetTypes")]
        public override IEnumerable<Liveo.WebApi.Controllers.HTType> GetTypes()
        {
            return base.GetTypes();
        }
    }
}