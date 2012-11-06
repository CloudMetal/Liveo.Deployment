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
    using System.Web.Http;

    using Liveo.Platform.Services;

    [ValidateInput(false)]
    public class ProgramApiController : ApiController
    {
        private ILiveoProgramService _programService;

        public ProgramApiController(ILiveoProgramService programService)
        {
            _programService = programService;
        }

        public virtual IQueryable<Program> GetAll()
        {
            //return _programService.GetQuery();
            return _programService.GetQuery().Where(p => p.AffiliateId != null && p.AffiliateId > 0);
        }

        public virtual Program Get(int id)
        {
            var model = _programService.GetById(id);

            if (model == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return model;
        }

        public HttpResponseMessage Post(Program model)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            _programService.Add(model);
            return Request.CreateResponse<Program>(HttpStatusCode.Created, model);
        }

    }
}