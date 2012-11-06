using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Orchard.Scheduler.Models;
using System.Web.Mvc;

namespace Orchard.Scheduler.ViewModels
{   
    public class SchedulerCreateViewModel
    {
        public SchedulerCreateViewModel()
        {
            StartDate = DateTime.Today.AddDays(1);
            Form = new ExpressionForm();
        }

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime? StartDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:hh\\:mm}", ApplyFormatInEditMode = true)]
        public TimeSpan StartTime { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime? EndDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:hh\\:mm}", ApplyFormatInEditMode = true)]
        public TimeSpan EndTime { get; set; }
        
        public bool Enabled { get; set; }
        
        public ExpressionForm Form { get; set; }

        public ExpressionType ExpressionType { get; set; }
    }    
}