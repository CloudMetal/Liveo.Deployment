
function UserQuestionModel(
            id,
            surveyQuestionId,
            createDate,
            lastUpdateDate) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.SurveyQuestionId = ko.observable(surveyQuestionId);
	_self.CreateDate = ko.observable(createDate);
	_self.LastUpdateDate = ko.observable(lastUpdateDate);

}

function UserQuestion_ViewModel() {
    //#region member vars
    testVariable_UserQuestion = 'UserQuestion viewmodel bound';

    var _self = this;

    var dummyUserQuestionModel = new UserQuestionModel(0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserQuestionModel = new ko.observable(dummyUserQuestionModel);
    _self.editedUserQuestionModel = ko.observable(dummyUserQuestionModel);
    _self.removedUserQuestionModel = ko.observable(dummyUserQuestionModel);
	_self.selectedUserQuestionModel = ko.observable(dummyUserQuestionModel);
	_self.candidateUserQuestionModel = ko.observable(dummyUserQuestionModel);
    _self.userQuestionModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserQuestionModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserQuestionApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserQuestionModel(data[i].Id, data[i].SurveyQuestionId, data[i].CreateDate, data[i].LastUpdateDate));
				}
				_self.userQuestionModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserQuestion items ');
                }
            }
		});
	}

	 _self.beginEditedUserQuestionModel = function (model, formlink) {
        _self.editedUserQuestionModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserQuestionModel = function (formlink) {
        _self.candidateUserQuestionModel(dummyUserQuestionModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserQuestionModel = function (model, formlink) {
        _self.removedUserQuestionModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserQuestionModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserQuestionApi?Id=' + _self.editedUserQuestionModel().Id(), {
            data: ko.toJSON(_self.editedUserQuestionModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userQuestionModels().length; i++) {
                    if (_self.userQuestionModels()[i].Id() == _self.editedUserQuestionModel().Id()) {

                        _self.userQuestionModels.replace(_self.userQuestionModels()[i], _self.editedUserQuestionModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserQuestionModel().Id());
                }

                console.log('Success edited UserQuestion item ' + _self.editedUserQuestionModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserQuestionModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserQuestionModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserQuestionApi', {
            data: ko.toJSON(_self.candidateUserQuestionModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserQuestion model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserQuestionModel().Id(addedModel.Id);
				_self.addedUserQuestionModel().SurveyQuestionId(addedModel.SurveyQuestionId);
				_self.addedUserQuestionModel().CreateDate(addedModel.CreateDate);
				_self.addedUserQuestionModel().LastUpdateDate(addedModel.LastUpdateDate);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserQuestion item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserQuestion model.');
            }
        });
    }

	 _self.commitRemovedUserQuestionModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserQuestionModel().Id)) {
            id = _self.removedUserQuestionModel().Id();
        } else {
            id = _self.removedUserQuestionModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserQuestionApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userQuestionModels.remove(_self.removedUserQuestionModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserQuestion item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserQuestion item ' + id + '.');
            }
        });
    }
   
    _self.saveUserQuestionAll = function () {
        var jsonData = ko.toJSON(_self.userQuestionModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

