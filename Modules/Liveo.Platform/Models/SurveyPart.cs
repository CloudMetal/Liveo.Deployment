using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Orchard.ContentManagement;

namespace Liveo.Platform.Models
{
    public class SurveyPart : ContentPart<SurveyRecord> {
        private Survey _survey;
        public SurveyPart() {
            _survey = new Survey();
        }
        public int SurveyId {
            get { return Record.SurveyId; }
            set { Record.SurveyId = value; }
        }

        public Survey Survey {
            get {
                if (_survey == null) {
                    _survey = new Survey();
                }
                return _survey;
            }
            set { _survey = value; }
        }

        public int MajorVersion {
            get { return Survey.MajorVersion; }
            set { Survey.MajorVersion = value; }
        }

        public int MinorVersion
        {
            get { return Survey.MinorVersion; }
            set { Survey.MinorVersion = value; }
        }

        public string Name {
            get { return Survey.Name; }
            set { Survey.Name = value;  }
        }

        public string Description {
            get { return Survey.Description; }
            set { Survey.Description = value; }
        }
    }
}