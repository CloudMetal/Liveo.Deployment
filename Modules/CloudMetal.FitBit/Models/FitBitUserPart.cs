using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Orchard.ContentManagement;

namespace CloudMetal.FitBit.Models
{
    public class FitBitUserPart : ContentPart<FitBitUserRecord>
    {
        [Required]
        public string Email {
            get { return Record.Email; }
            set { Record.Email = value; }
        }

        public string OAuthToken {
            get { return Record.OAuthToken; }
            set { Record.OAuthToken = value; }
        }
    }
}