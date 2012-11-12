
function UserProgramCycleModel(
            id,
            userProgramId,
            programCycleId,
            startDate,
            endDate) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.UserProgramId = ko.observable(userProgramId);
	_self.ProgramCycleId = ko.observable(programCycleId);
	_self.StartDate = ko.observable(startDate);
	_self.EndDate = ko.observable(endDate);

}

function UserProgramCycle_ViewModel() {
    //#region member vars
    testVariable_UserProgramCycle = 'UserProgramCycle viewmodel bound';

    var _self = this;

    var dummyUserProgramCycleModel = new UserProgramCycleModel(0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserProgramCycleModel = new ko.observable(dummyUserProgramCycleModel);
    _self.editedUserProgramCycleModel = ko.observable(dummyUserProgramCycleModel);
    _self.removedUserProgramCycleModel = ko.observable(dummyUserProgramCycleModel);
	_self.selectedUserProgramCycleModel = ko.observable(dummyUserProgramCycleModel);
	_self.candidateUserProgramCycleModel = ko.observable(dummyUserProgramCycleModel);
    _self.userProgramCycleModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserProgramCycleModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserProgramCycleApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserProgramCycleModel(data[i].Id, data[i].UserProgramId, data[i].ProgramCycleId, data[i].StartDate, data[i].EndDate));
				}
				_self.userProgramCycleModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserProgramCycle items ');
                }
            }
		});
	}

	 _self.beginEditedUserProgramCycleModel = function (model, formlink) {
        _self.editedUserProgramCycleModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserProgramCycleModel = function (formlink) {
        _self.candidateUserProgramCycleModel(dummyUserProgramCycleModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserProgramCycleModel = function (model, formlink) {
        _self.removedUserProgramCycleModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserProgramCycleModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserProgramCycleApi?Id=' + _self.editedUserProgramCycleModel().Id(), {
            data: ko.toJSON(_self.editedUserProgramCycleModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userProgramCycleModels().length; i++) {
                    if (_self.userProgramCycleModels()[i].Id() == _self.editedUserProgramCycleModel().Id()) {

                        _self.userProgramCycleModels.replace(_self.userProgramCycleModels()[i], _self.editedUserProgramCycleModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserProgramCycleModel().Id());
                }

                console.log('Success edited UserProgramCycle item ' + _self.editedUserProgramCycleModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserProgramCycleModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserProgramCycleModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserProgramCycleApi', {
            data: ko.toJSON(_self.candidateUserProgramCycleModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserProgramCycle model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserProgramCycleModel().Id(addedModel.Id);
				_self.addedUserProgramCycleModel().UserProgramId(addedModel.UserProgramId);
				_self.addedUserProgramCycleModel().ProgramCycleId(addedModel.ProgramCycleId);
				_self.addedUserProgramCycleModel().StartDate(addedModel.StartDate);
				_self.addedUserProgramCycleModel().EndDate(addedModel.EndDate);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserProgramCycle item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserProgramCycle model.');
            }
        });
    }

	 _self.commitRemovedUserProgramCycleModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserProgramCycleModel().Id)) {
            id = _self.removedUserProgramCycleModel().Id();
        } else {
            id = _self.removedUserProgramCycleModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserProgramCycleApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userProgramCycleModels.remove(_self.removedUserProgramCycleModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserProgramCycle item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserProgramCycle item ' + id + '.');
            }
        });
    }
   
    _self.saveUserProgramCycleAll = function () {
        var jsonData = ko.toJSON(_self.userProgramCycleModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

