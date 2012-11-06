
function QuestionTypeModel(
            id,
            name,
            isMultiChoice,
            isSingleAnswer,
            hasCorrectAnswer,
            hasTextAnswer,
            hasCommentsAllowed) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.IsMultiChoice = ko.observable(isMultiChoice);
	_self.IsSingleAnswer = ko.observable(isSingleAnswer);
	_self.HasCorrectAnswer = ko.observable(hasCorrectAnswer);
	_self.HasTextAnswer = ko.observable(hasTextAnswer);
	_self.HasCommentsAllowed = ko.observable(hasCommentsAllowed);

}

function QuestionType_ViewModel() {
    //#region member vars
    testVariable_QuestionType = 'QuestionType viewmodel bound';

    var _self = this;

    var dummyQuestionTypeModel = new QuestionTypeModel(0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedQuestionTypeModel = new ko.observable(dummyQuestionTypeModel);
    _self.editedQuestionTypeModel = ko.observable(dummyQuestionTypeModel);
    _self.removedQuestionTypeModel = ko.observable(dummyQuestionTypeModel);
	_self.selectedQuestionTypeModel = ko.observable(dummyQuestionTypeModel);
	_self.candidateQuestionTypeModel = ko.observable(dummyQuestionTypeModel);
    _self.questionTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllQuestionTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/QuestionTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new QuestionTypeModel(data[i].Id, data[i].Name, data[i].IsMultiChoice, data[i].IsSingleAnswer, data[i].HasCorrectAnswer, data[i].HasTextAnswer, data[i].HasCommentsAllowed));
				}
				_self.questionTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get QuestionType items ');
                }
            }
		});
	}

	 _self.beginEditedQuestionTypeModel = function (model, formlink) {
        _self.editedQuestionTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateQuestionTypeModel = function (formlink) {
        _self.candidateQuestionTypeModel(dummyQuestionTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveQuestionTypeModel = function (model, formlink) {
        _self.removedQuestionTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedQuestionTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/QuestionTypeApi?Id=' + _self.editedQuestionTypeModel().Id(), {
            data: ko.toJSON(_self.editedQuestionTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.questionTypeModels().length; i++) {
                    if (_self.questionTypeModels()[i].Id() == _self.editedQuestionTypeModel().Id()) {

                        _self.questionTypeModels.replace(_self.questionTypeModels()[i], _self.editedQuestionTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedQuestionTypeModel().Id());
                }

                console.log('Success edited QuestionType item ' + _self.editedQuestionTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedQuestionTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateQuestionTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/QuestionTypeApi', {
            data: ko.toJSON(_self.candidateQuestionTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new QuestionType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedQuestionTypeModel().Id(addedModel.Id);
				_self.addedQuestionTypeModel().Name(addedModel.Name);
				_self.addedQuestionTypeModel().IsMultiChoice(addedModel.IsMultiChoice);
				_self.addedQuestionTypeModel().IsSingleAnswer(addedModel.IsSingleAnswer);
				_self.addedQuestionTypeModel().HasCorrectAnswer(addedModel.HasCorrectAnswer);
				_self.addedQuestionTypeModel().HasTextAnswer(addedModel.HasTextAnswer);
				_self.addedQuestionTypeModel().HasCommentsAllowed(addedModel.HasCommentsAllowed);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added QuestionType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new QuestionType model.');
            }
        });
    }

	 _self.commitRemovedQuestionTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedQuestionTypeModel().Id)) {
            id = _self.removedQuestionTypeModel().Id();
        } else {
            id = _self.removedQuestionTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/QuestionTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.questionTypeModels.remove(_self.removedQuestionTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed QuestionType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove QuestionType item ' + id + '.');
            }
        });
    }
   
    _self.saveQuestionTypeAll = function () {
        var jsonData = ko.toJSON(_self.questionTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

