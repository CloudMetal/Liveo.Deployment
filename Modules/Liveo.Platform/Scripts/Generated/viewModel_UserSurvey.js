
function UserSurveyModel(
            id,
            userId,
            createDate,
            surveyId,
            startDate,
            completionDate,
            lastUpdateDate) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.UserId = ko.observable(userId);
	_self.CreateDate = ko.observable(createDate);
	_self.SurveyId = ko.observable(surveyId);
	_self.StartDate = ko.observable(startDate);
	_self.CompletionDate = ko.observable(completionDate);
	_self.LastUpdateDate = ko.observable(lastUpdateDate);

}

function UserSurvey_ViewModel() {
    //#region member vars
    testVariable_UserSurvey = 'UserSurvey viewmodel bound';

    var _self = this;

    var dummyUserSurveyModel = new UserSurveyModel(0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserSurveyModel = new ko.observable(dummyUserSurveyModel);
    _self.editedUserSurveyModel = ko.observable(dummyUserSurveyModel);
    _self.removedUserSurveyModel = ko.observable(dummyUserSurveyModel);
	_self.selectedUserSurveyModel = ko.observable(dummyUserSurveyModel);
	_self.candidateUserSurveyModel = ko.observable(dummyUserSurveyModel);
    _self.userSurveyModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserSurveyModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserSurveyApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserSurveyModel(data[i].Id, data[i].UserId, data[i].CreateDate, data[i].SurveyId, data[i].StartDate, data[i].CompletionDate, data[i].LastUpdateDate));
				}
				_self.userSurveyModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserSurvey items ');
                }
            }
		});
	}

	 _self.beginEditedUserSurveyModel = function (model, formlink) {
        _self.editedUserSurveyModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserSurveyModel = function (formlink) {
        _self.candidateUserSurveyModel(dummyUserSurveyModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserSurveyModel = function (model, formlink) {
        _self.removedUserSurveyModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserSurveyModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserSurveyApi?Id=' + _self.editedUserSurveyModel().Id(), {
            data: ko.toJSON(_self.editedUserSurveyModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userSurveyModels().length; i++) {
                    if (_self.userSurveyModels()[i].Id() == _self.editedUserSurveyModel().Id()) {

                        _self.userSurveyModels.replace(_self.userSurveyModels()[i], _self.editedUserSurveyModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserSurveyModel().Id());
                }

                console.log('Success edited UserSurvey item ' + _self.editedUserSurveyModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserSurveyModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserSurveyModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserSurveyApi', {
            data: ko.toJSON(_self.candidateUserSurveyModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserSurvey model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserSurveyModel().Id(addedModel.Id);
				_self.addedUserSurveyModel().UserId(addedModel.UserId);
				_self.addedUserSurveyModel().CreateDate(addedModel.CreateDate);
				_self.addedUserSurveyModel().SurveyId(addedModel.SurveyId);
				_self.addedUserSurveyModel().StartDate(addedModel.StartDate);
				_self.addedUserSurveyModel().CompletionDate(addedModel.CompletionDate);
				_self.addedUserSurveyModel().LastUpdateDate(addedModel.LastUpdateDate);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserSurvey item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserSurvey model.');
            }
        });
    }

	 _self.commitRemovedUserSurveyModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserSurveyModel().Id)) {
            id = _self.removedUserSurveyModel().Id();
        } else {
            id = _self.removedUserSurveyModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserSurveyApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userSurveyModels.remove(_self.removedUserSurveyModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserSurvey item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserSurvey item ' + id + '.');
            }
        });
    }
   
    _self.saveUserSurveyAll = function () {
        var jsonData = ko.toJSON(_self.userSurveyModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

