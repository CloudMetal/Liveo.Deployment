using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement;

namespace Liveo.Platform.Models
{
    public class GoalListPart : ContentPart<GoalListRecord>
    {
        public int UserId {
            get { return Record.UserId; }
            set { Record.UserId = value;  }
        }
    }
}