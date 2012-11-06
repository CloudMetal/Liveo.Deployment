using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Liveo.Platform.Controllers
{
    public class TestController : ApiController
    {
        public string Get() {
            return "{ \"Done\":0}";
        }
    }
}