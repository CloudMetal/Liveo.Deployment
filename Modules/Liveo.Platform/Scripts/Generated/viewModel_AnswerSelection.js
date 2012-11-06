
function AnswerSelectionModel(
            id,
            name,
            description,
            index,
            surveyQuestionId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);
	_self.Index = ko.observable(index);
	_self.SurveyQuestionId = ko.observable(surveyQuestionId);

}

function AnswerSelection_ViewModel() {
    //#region member vars
    testVariable_AnswerSelection = 'AnswerSelection viewmodel bound';

    var _self = this;

    var dummyAnswerSelectionModel = new AnswerSelectionModel(0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedAnswerSelectionModel = new ko.observable(dummyAnswerSelectionModel);
    _self.editedAnswerSelectionModel = ko.observable(dummyAnswerSelectionModel);
    _self.removedAnswerSelectionModel = ko.observable(dummyAnswerSelectionModel);
	_self.selectedAnswerSelectionModel = ko.observable(dummyAnswerSelectionModel);
	_self.candidateAnswerSelectionModel = ko.observable(dummyAnswerSelectionModel);
    _self.answerSelectionModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllAnswerSelectionModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/AnswerSelectionApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new AnswerSelectionModel(data[i].Id, data[i].Name, data[i].Description, data[i].Index, data[i].SurveyQuestionId));
				}
				_self.answerSelectionModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get AnswerSelection items ');
                }
            }
		});
	}

	 _self.beginEditedAnswerSelectionModel = function (model, formlink) {
        _self.editedAnswerSelectionModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateAnswerSelectionModel = function (formlink) {
        _self.candidateAnswerSelectionModel(dummyAnswerSelectionModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveAnswerSelectionModel = function (model, formlink) {
        _self.removedAnswerSelectionModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedAnswerSelectionModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/AnswerSelectionApi?Id=' + _self.editedAnswerSelectionModel().Id(), {
            data: ko.toJSON(_self.editedAnswerSelectionModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.answerSelectionModels().length; i++) {
                    if (_self.answerSelectionModels()[i].Id() == _self.editedAnswerSelectionModel().Id()) {

                        _self.answerSelectionModels.replace(_self.answerSelectionModels()[i], _self.editedAnswerSelectionModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedAnswerSelectionModel().Id());
                }

                console.log('Success edited AnswerSelection item ' + _self.editedAnswerSelectionModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedAnswerSelectionModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateAnswerSelectionModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/AnswerSelectionApi', {
            data: ko.toJSON(_self.candidateAnswerSelectionModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new AnswerSelection model');
                addedModel = JSON.parse(result.responseText);
				_self.addedAnswerSelectionModel().Id(addedModel.Id);
				_self.addedAnswerSelectionModel().Name(addedModel.Name);
				_self.addedAnswerSelectionModel().Description(addedModel.Description);
				_self.addedAnswerSelectionModel().Index(addedModel.Index);
				_self.addedAnswerSelectionModel().SurveyQuestionId(addedModel.SurveyQuestionId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added AnswerSelection item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new AnswerSelection model.');
            }
        });
    }

	 _self.commitRemovedAnswerSelectionModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedAnswerSelectionModel().Id)) {
            id = _self.removedAnswerSelectionModel().Id();
        } else {
            id = _self.removedAnswerSelectionModel().Id;
        }

        $.ajax('/api/Liveo.Platform/AnswerSelectionApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.answerSelectionModels.remove(_self.removedAnswerSelectionModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed AnswerSelection item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove AnswerSelection item ' + id + '.');
            }
        });
    }
   
    _self.saveAnswerSelectionAll = function () {
        var jsonData = ko.toJSON(_self.answerSelectionModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

