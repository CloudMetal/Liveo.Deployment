using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Liveo.Platform.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required, DataType(DataType.Password)]
        public string Password { get; set; }

        [Required, DataType(DataType.Password)]
        [System.Web.Mvc.Compare("Password", ErrorMessage = "Passwords must match")]
        [DisplayName("Repeat Password")]
        public string PasswordRepeat { get; set; }
    }
}