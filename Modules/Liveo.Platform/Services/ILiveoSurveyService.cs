using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Models;
using Orchard;

namespace Liveo.Platform.Services
{
    public interface ILiveoSurveyService : ISurveyService, IDependency {
        SurveyPart GetRegistrationSurvey();
        IQueryable<SurveyQuestion> Questions { get; }
        IQueryable<QuestionType> QuestionTypes { get; } 
        SurveyPart Get(int id);
        SurveyPart CreatePart(SurveyPart part);
        void UpdatePart(SurveyPart part);
        void DeletePart(SurveyPart part);
    }
}
