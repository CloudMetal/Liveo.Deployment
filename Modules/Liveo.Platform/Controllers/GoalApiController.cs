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
namespace Liveo.Platform.Controllers
{
    [ValidateInput(false)]
    public class GoalApiController : ApiController{
        private ILiveoGoalService _goalService;

        public GoalApiController(ILiveoGoalService goalService)
        {
            _goalService = goalService;
        }

        public virtual IQueryable<Goal> GetAll()
        {
            //return _programService.GetQuery();
            return _goalService.GetQuery();
        }

        public virtual Goal Get(int id)
        {
            var model = _goalService.GetById(id);

            if (model == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return model;
        }

        public HttpResponseMessage Post(Goal model)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            _goalService.Add(model);
            return Request.CreateResponse<Goal>(HttpStatusCode.Created, model);
        }
    }
}