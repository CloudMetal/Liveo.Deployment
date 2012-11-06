using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.ViewModels
{
    public class SurveyQuestionEditViewModel
    {
        public SurveyQuestion Question { get; set; }

        public IEnumerable<QuestionType> QuestionTypes { get; set; }
    }
}