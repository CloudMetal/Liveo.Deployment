using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.Data
{
    public class LiveoAnswerSelectionRepository : AnswerSelectionRepository, ILiveoAnswerSelectionRepository
    {
        public LiveoAnswerSelectionRepository(ILiveoDataContext dbContext) : base(dbContext.Context) {}
    }
}