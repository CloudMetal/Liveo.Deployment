using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.Data
{
    public class LiveoSurveyQuestionRepository : SurveyQuestionRepository, ILiveoSurveyQuestionRepository
    {
        public LiveoSurveyQuestionRepository(ILiveoDataContext dbContext) : base(dbContext.Context) {}
    }
}