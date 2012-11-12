using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using Liveo.Framework.Model;
using Liveo.Framework.Model.Service;
using Liveo.Platform.Services;
using System.Reflection;
namespace Liveo.Platform.Controllers
{
    using System.Web.Http;

    using Liveo.Platform.Services;

    [ValidateInput(false)]
    public class UserApiController : ApiController {
        private ILiveoUserService _userService;

        public UserApiController(ILiveoUserService userService) {
                _userService = userService;
        }

        public virtual IQueryable<User> GetAll()
        {
            return _userService.GetQuery();
        }

        public virtual User Get(int id)
        {
            var model = _userService.GetById(id);

            if (model == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return model;
        }

        public HttpResponseMessage Post(User model) {
            if (!ModelState.IsValid) {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            _userService.Add(model);
            return Request.CreateResponse<User>(HttpStatusCode.Created, model);
        }

        [HttpPut]
        public virtual User Put(int id, User model)
        {
            var final = _userService.GetById(id);
            MapProperties<User>(model, final);
            _userService.Save(final);
            return final;
        }

        protected void MapProperties<T>(T source, T destination)
        {
            var type = typeof(T);

            foreach (var property in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                // IsSealed is a funny choice, but it turns out native .NET properties are Sealed where custom objects are not
                // There are other choices as well, but none really made "English" sense so I chose this one as I felt it was the best match for what we are doing
                if (property.PropertyType.IsSealed
                    && property.Name != "Id")
                {
                    var value = property.GetValue(source, null);
                    property.SetValue(destination, value, null);
                }
            }
        }

        //[ActionName("HasCompletedInitialScreen")]
        //public bool HasCompletedInitialScreen(int id)
        //{
        //    return true;
        //}
    }
}