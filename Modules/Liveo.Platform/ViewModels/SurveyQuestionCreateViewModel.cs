using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;

namespace Liveo.Platform.ViewModels
{
    public class SurveyQuestionCreateViewModel
    {
        public int QuestionTypeId { get; set; }

        public int SurveyId { get; set; }

        [Required]
        public string QuestionText { get; set; }

        public IEnumerable<QuestionType> QuestionTypes { get; set; } 
    }
}