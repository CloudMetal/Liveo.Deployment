using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Liveo.Framework.Model;
using Orchard.ContentManagement;

namespace Liveo.Platform.Models
{
    public class LiveoUserPart : ContentPart<LiveoUserRecord>
    {
        public LiveoUserPart() {
            User = new User();
        }

        public int UserId
        {
            get { return Record.UserId; }
            set { Record.UserId = value; }
        }

        public User User { get; set; }

        public string UserName
        {
            get { return User.Email; }
        }

        public string Email
        {
            get { return User.Email; }
        }
    }
}