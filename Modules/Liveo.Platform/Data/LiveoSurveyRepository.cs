using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.Data
{
    public class LiveoSurveyRepository : SurveyRepository, ILiveoSurveyRepository
    {
        public LiveoSurveyRepository(ILiveoDataContext context) : base(context.Context) {}
    }
}