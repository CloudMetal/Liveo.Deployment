using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.ViewModels
{
    public class SurveyQuestionListViewModel
    {
        public IList<SurveyQuestion> Questions { get; set; }
        public dynamic Pager { get; set; }
        public SurveyQuestionSearchViewModel Search { get; set; }
        public int SurveyId { get; set; }

        public SurveyQuestionListViewModel(IList<SurveyQuestion> questions, SurveyQuestionSearchViewModel search, dynamic pager)
        {
            Questions = questions;
            Search = search;
            Pager = pager;
        }
    }
}