
function UserProgramModel(
            id,
            userId,
            programId,
            createDate,
            startDate,
            endDate,
            isActive) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.UserId = ko.observable(userId);
	_self.ProgramId = ko.observable(programId);
	_self.CreateDate = ko.observable(createDate);
	_self.StartDate = ko.observable(startDate);
	_self.EndDate = ko.observable(endDate);
	_self.IsActive = ko.observable(isActive);

}

function UserProgram_ViewModel() {
    //#region member vars
    testVariable_UserProgram = 'UserProgram viewmodel bound';

    var _self = this;

    var dummyUserProgramModel = new UserProgramModel(0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserProgramModel = new ko.observable(dummyUserProgramModel);
    _self.editedUserProgramModel = ko.observable(dummyUserProgramModel);
    _self.removedUserProgramModel = ko.observable(dummyUserProgramModel);
	_self.selectedUserProgramModel = ko.observable(dummyUserProgramModel);
	_self.candidateUserProgramModel = ko.observable(dummyUserProgramModel);
    _self.userProgramModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserProgramModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserProgramApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserProgramModel(data[i].Id, data[i].UserId, data[i].ProgramId, data[i].CreateDate, data[i].StartDate, data[i].EndDate, data[i].IsActive));
				}
				_self.userProgramModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserProgram items ');
                }
            }
		});
	}

	 _self.beginEditedUserProgramModel = function (model, formlink) {
        _self.editedUserProgramModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserProgramModel = function (formlink) {
        _self.candidateUserProgramModel(dummyUserProgramModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserProgramModel = function (model, formlink) {
        _self.removedUserProgramModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserProgramModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserProgramApi?Id=' + _self.editedUserProgramModel().Id(), {
            data: ko.toJSON(_self.editedUserProgramModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userProgramModels().length; i++) {
                    if (_self.userProgramModels()[i].Id() == _self.editedUserProgramModel().Id()) {

                        _self.userProgramModels.replace(_self.userProgramModels()[i], _self.editedUserProgramModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserProgramModel().Id());
                }

                console.log('Success edited UserProgram item ' + _self.editedUserProgramModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserProgramModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserProgramModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserProgramApi', {
            data: ko.toJSON(_self.candidateUserProgramModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserProgram model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserProgramModel().Id(addedModel.Id);
				_self.addedUserProgramModel().UserId(addedModel.UserId);
				_self.addedUserProgramModel().ProgramId(addedModel.ProgramId);
				_self.addedUserProgramModel().CreateDate(addedModel.CreateDate);
				_self.addedUserProgramModel().StartDate(addedModel.StartDate);
				_self.addedUserProgramModel().EndDate(addedModel.EndDate);
				_self.addedUserProgramModel().IsActive(addedModel.IsActive);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserProgram item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserProgram model.');
            }
        });
    }

	 _self.commitRemovedUserProgramModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserProgramModel().Id)) {
            id = _self.removedUserProgramModel().Id();
        } else {
            id = _self.removedUserProgramModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserProgramApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userProgramModels.remove(_self.removedUserProgramModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserProgram item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserProgram item ' + id + '.');
            }
        });
    }
   
    _self.saveUserProgramAll = function () {
        var jsonData = ko.toJSON(_self.userProgramModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

