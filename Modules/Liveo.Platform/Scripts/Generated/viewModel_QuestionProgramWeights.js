
function QuestionProgramWeightsModel(
            id,
            surveyQuestionId,
            programId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.SurveyQuestionId = ko.observable(surveyQuestionId);
	_self.ProgramId = ko.observable(programId);

}

function QuestionProgramWeights_ViewModel() {
    //#region member vars
    testVariable_QuestionProgramWeights = 'QuestionProgramWeights viewmodel bound';

    var _self = this;

    var dummyQuestionProgramWeightsModel = new QuestionProgramWeightsModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedQuestionProgramWeightsModel = new ko.observable(dummyQuestionProgramWeightsModel);
    _self.editedQuestionProgramWeightsModel = ko.observable(dummyQuestionProgramWeightsModel);
    _self.removedQuestionProgramWeightsModel = ko.observable(dummyQuestionProgramWeightsModel);
	_self.selectedQuestionProgramWeightsModel = ko.observable(dummyQuestionProgramWeightsModel);
	_self.candidateQuestionProgramWeightsModel = ko.observable(dummyQuestionProgramWeightsModel);
    _self.questionProgramWeightsModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllQuestionProgramWeightsModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/QuestionProgramWeightsApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new QuestionProgramWeightsModel(data[i].Id, data[i].SurveyQuestionId, data[i].ProgramId));
				}
				_self.questionProgramWeightsModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get QuestionProgramWeights items ');
                }
            }
		});
	}

	 _self.beginEditedQuestionProgramWeightsModel = function (model, formlink) {
        _self.editedQuestionProgramWeightsModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateQuestionProgramWeightsModel = function (formlink) {
        _self.candidateQuestionProgramWeightsModel(dummyQuestionProgramWeightsModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveQuestionProgramWeightsModel = function (model, formlink) {
        _self.removedQuestionProgramWeightsModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedQuestionProgramWeightsModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/QuestionProgramWeightsApi?Id=' + _self.editedQuestionProgramWeightsModel().Id(), {
            data: ko.toJSON(_self.editedQuestionProgramWeightsModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.questionProgramWeightsModels().length; i++) {
                    if (_self.questionProgramWeightsModels()[i].Id() == _self.editedQuestionProgramWeightsModel().Id()) {

                        _self.questionProgramWeightsModels.replace(_self.questionProgramWeightsModels()[i], _self.editedQuestionProgramWeightsModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedQuestionProgramWeightsModel().Id());
                }

                console.log('Success edited QuestionProgramWeights item ' + _self.editedQuestionProgramWeightsModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedQuestionProgramWeightsModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateQuestionProgramWeightsModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/QuestionProgramWeightsApi', {
            data: ko.toJSON(_self.candidateQuestionProgramWeightsModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new QuestionProgramWeights model');
                addedModel = JSON.parse(result.responseText);
				_self.addedQuestionProgramWeightsModel().Id(addedModel.Id);
				_self.addedQuestionProgramWeightsModel().SurveyQuestionId(addedModel.SurveyQuestionId);
				_self.addedQuestionProgramWeightsModel().ProgramId(addedModel.ProgramId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added QuestionProgramWeights item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new QuestionProgramWeights model.');
            }
        });
    }

	 _self.commitRemovedQuestionProgramWeightsModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedQuestionProgramWeightsModel().Id)) {
            id = _self.removedQuestionProgramWeightsModel().Id();
        } else {
            id = _self.removedQuestionProgramWeightsModel().Id;
        }

        $.ajax('/api/Liveo.Platform/QuestionProgramWeightsApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.questionProgramWeightsModels.remove(_self.removedQuestionProgramWeightsModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed QuestionProgramWeights item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove QuestionProgramWeights item ' + id + '.');
            }
        });
    }
   
    _self.saveQuestionProgramWeightsAll = function () {
        var jsonData = ko.toJSON(_self.questionProgramWeightsModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

