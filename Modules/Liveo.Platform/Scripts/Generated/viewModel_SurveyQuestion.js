
function SurveyQuestionModel(
            id,
            questionText,
            questionTypeId,
            surveyId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.QuestionText = ko.observable(questionText);
	_self.QuestionTypeId = ko.observable(questionTypeId);
	_self.SurveyId = ko.observable(surveyId);

}

function SurveyQuestion_ViewModel() {
    //#region member vars
    testVariable_SurveyQuestion = 'SurveyQuestion viewmodel bound';

    var _self = this;

    var dummySurveyQuestionModel = new SurveyQuestionModel(0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedSurveyQuestionModel = new ko.observable(dummySurveyQuestionModel);
    _self.editedSurveyQuestionModel = ko.observable(dummySurveyQuestionModel);
    _self.removedSurveyQuestionModel = ko.observable(dummySurveyQuestionModel);
	_self.selectedSurveyQuestionModel = ko.observable(dummySurveyQuestionModel);
	_self.candidateSurveyQuestionModel = ko.observable(dummySurveyQuestionModel);
    _self.surveyQuestionModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllSurveyQuestionModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/SurveyQuestionApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new SurveyQuestionModel(data[i].Id, data[i].QuestionText, data[i].QuestionTypeId, data[i].SurveyId));
				}
				_self.surveyQuestionModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get SurveyQuestion items ');
                }
            }
		});
	}

	 _self.beginEditedSurveyQuestionModel = function (model, formlink) {
        _self.editedSurveyQuestionModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateSurveyQuestionModel = function (formlink) {
        _self.candidateSurveyQuestionModel(dummySurveyQuestionModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveSurveyQuestionModel = function (model, formlink) {
        _self.removedSurveyQuestionModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedSurveyQuestionModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/SurveyQuestionApi?Id=' + _self.editedSurveyQuestionModel().Id(), {
            data: ko.toJSON(_self.editedSurveyQuestionModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.surveyQuestionModels().length; i++) {
                    if (_self.surveyQuestionModels()[i].Id() == _self.editedSurveyQuestionModel().Id()) {

                        _self.surveyQuestionModels.replace(_self.surveyQuestionModels()[i], _self.editedSurveyQuestionModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedSurveyQuestionModel().Id());
                }

                console.log('Success edited SurveyQuestion item ' + _self.editedSurveyQuestionModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedSurveyQuestionModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateSurveyQuestionModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/SurveyQuestionApi', {
            data: ko.toJSON(_self.candidateSurveyQuestionModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new SurveyQuestion model');
                addedModel = JSON.parse(result.responseText);
				_self.addedSurveyQuestionModel().Id(addedModel.Id);
				_self.addedSurveyQuestionModel().QuestionText(addedModel.QuestionText);
				_self.addedSurveyQuestionModel().QuestionTypeId(addedModel.QuestionTypeId);
				_self.addedSurveyQuestionModel().SurveyId(addedModel.SurveyId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added SurveyQuestion item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new SurveyQuestion model.');
            }
        });
    }

	 _self.commitRemovedSurveyQuestionModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedSurveyQuestionModel().Id)) {
            id = _self.removedSurveyQuestionModel().Id();
        } else {
            id = _self.removedSurveyQuestionModel().Id;
        }

        $.ajax('/api/Liveo.Platform/SurveyQuestionApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.surveyQuestionModels.remove(_self.removedSurveyQuestionModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed SurveyQuestion item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove SurveyQuestion item ' + id + '.');
            }
        });
    }
   
    _self.saveSurveyQuestionAll = function () {
        var jsonData = ko.toJSON(_self.surveyQuestionModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

