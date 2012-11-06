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
    public class AnswerSelectionApiController : ApiController {
        private ILiveoAnswerSelectionService _answerSelectionService;
        private ILiveoSurveyQuestionService _surveyQuestionService;
        public AnswerSelectionApiController(ILiveoAnswerSelectionService answerSelectionService,
            ILiveoSurveyQuestionService surveyQuestionService) {
            _answerSelectionService = answerSelectionService;
            _surveyQuestionService = surveyQuestionService;
        }

        public IQueryable<AnswerSelection> Get(int questionId) {
            var question = _surveyQuestionService.GetById(questionId);
            if (question == null) {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return _answerSelectionService.GetQuery().Where(a => a.SurveyQuestionId == questionId);
        }

        //[ValidateAntiForgeryToken()]
        public HttpResponseMessage Post(AnswerSelection answerSelection) {
            if (!ModelState.IsValid) {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            _answerSelectionService.Add(answerSelection);
            return Request.CreateResponse<AnswerSelection>(HttpStatusCode.Created, answerSelection);
        }

        public HttpResponseMessage Put(AnswerSelection answerSelection)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            var oldSelection = _answerSelectionService.GetById(answerSelection.Id);
            if (oldSelection == null) {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            oldSelection.Index = answerSelection.Index;
            oldSelection.Name = answerSelection.Name;
            oldSelection.Description = answerSelection.Description;

            _answerSelectionService.Save(oldSelection);
            return Request.CreateResponse<AnswerSelection>(HttpStatusCode.OK, answerSelection);
        }

        public void Delete(int questionId) {
            var question = _answerSelectionService.GetById(questionId);
            if (question == null) {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            _answerSelectionService.Delete(question);
        }
    }

    
}