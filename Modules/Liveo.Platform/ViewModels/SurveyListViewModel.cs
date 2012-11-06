using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Liveo.Platform.Models;

namespace Liveo.Platform.ViewModels
{
    public class SurveySearchViewModel {
        public string Expression { get; set; }
    }
    public class SurveyListViewModel
    {
        public IList<SurveyPart> Surveys { get; set; }
        public dynamic Pager { get; set; }
        public SurveySearchViewModel Search { get; set; }

        public SurveyListViewModel(IList<SurveyPart> surveys, SurveySearchViewModel search, dynamic pager)
        {
            Surveys = surveys;
            Search = search;
            Pager = pager;
        }
    }
}