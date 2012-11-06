using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.Records;

namespace Liveo.Platform.Models
{
    public class SurveyRecord : ContentPartRecord
    {
        public virtual int SurveyId { get; set; }
    }
}