using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Liveo.Platform.Data
{
    using Liveo.Framework.Model;

    public class LiveoChartTypeRepository : ChartTypeRepository, ILiveoChartTypeRepository
    {
        public LiveoChartTypeRepository(ILiveoDataContext dbContext)
            : base(dbContext.Context) {}
    }
}