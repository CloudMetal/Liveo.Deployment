
function UserAnswerModel(
            id,
            userQuestionId,
            content,
            comment,
            answerSelectionId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.UserQuestionId = ko.observable(userQuestionId);
	_self.Content = ko.observable(content);
	_self.Comment = ko.observable(comment);
	_self.AnswerSelectionId = ko.observable(answerSelectionId);

}

function UserAnswer_ViewModel() {
    //#region member vars
    testVariable_UserAnswer = 'UserAnswer viewmodel bound';

    var _self = this;

    var dummyUserAnswerModel = new UserAnswerModel(0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserAnswerModel = new ko.observable(dummyUserAnswerModel);
    _self.editedUserAnswerModel = ko.observable(dummyUserAnswerModel);
    _self.removedUserAnswerModel = ko.observable(dummyUserAnswerModel);
	_self.selectedUserAnswerModel = ko.observable(dummyUserAnswerModel);
	_self.candidateUserAnswerModel = ko.observable(dummyUserAnswerModel);
    _self.userAnswerModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserAnswerModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserAnswerApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserAnswerModel(data[i].Id, data[i].UserQuestionId, data[i].Content, data[i].Comment, data[i].AnswerSelectionId));
				}
				_self.userAnswerModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserAnswer items ');
                }
            }
		});
	}

	 _self.beginEditedUserAnswerModel = function (model, formlink) {
        _self.editedUserAnswerModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserAnswerModel = function (formlink) {
        _self.candidateUserAnswerModel(dummyUserAnswerModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserAnswerModel = function (model, formlink) {
        _self.removedUserAnswerModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserAnswerModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserAnswerApi?Id=' + _self.editedUserAnswerModel().Id(), {
            data: ko.toJSON(_self.editedUserAnswerModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userAnswerModels().length; i++) {
                    if (_self.userAnswerModels()[i].Id() == _self.editedUserAnswerModel().Id()) {

                        _self.userAnswerModels.replace(_self.userAnswerModels()[i], _self.editedUserAnswerModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserAnswerModel().Id());
                }

                console.log('Success edited UserAnswer item ' + _self.editedUserAnswerModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserAnswerModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserAnswerModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserAnswerApi', {
            data: ko.toJSON(_self.candidateUserAnswerModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserAnswer model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserAnswerModel().Id(addedModel.Id);
				_self.addedUserAnswerModel().UserQuestionId(addedModel.UserQuestionId);
				_self.addedUserAnswerModel().Content(addedModel.Content);
				_self.addedUserAnswerModel().Comment(addedModel.Comment);
				_self.addedUserAnswerModel().AnswerSelectionId(addedModel.AnswerSelectionId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserAnswer item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserAnswer model.');
            }
        });
    }

	 _self.commitRemovedUserAnswerModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserAnswerModel().Id)) {
            id = _self.removedUserAnswerModel().Id();
        } else {
            id = _self.removedUserAnswerModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserAnswerApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userAnswerModels.remove(_self.removedUserAnswerModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserAnswer item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserAnswer item ' + id + '.');
            }
        });
    }
   
    _self.saveUserAnswerAll = function () {
        var jsonData = ko.toJSON(_self.userAnswerModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

