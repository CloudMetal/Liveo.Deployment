
function UserPersonaModel(
            id,
            personaId,
            userId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.PersonaId = ko.observable(personaId);
	_self.UserId = ko.observable(userId);

}

function UserPersona_ViewModel() {
    //#region member vars
    testVariable_UserPersona = 'UserPersona viewmodel bound';

    var _self = this;

    var dummyUserPersonaModel = new UserPersonaModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserPersonaModel = new ko.observable(dummyUserPersonaModel);
    _self.editedUserPersonaModel = ko.observable(dummyUserPersonaModel);
    _self.removedUserPersonaModel = ko.observable(dummyUserPersonaModel);
	_self.selectedUserPersonaModel = ko.observable(dummyUserPersonaModel);
	_self.candidateUserPersonaModel = ko.observable(dummyUserPersonaModel);
    _self.userPersonaModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserPersonaModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserPersonaApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserPersonaModel(data[i].Id, data[i].PersonaId, data[i].UserId));
				}
				_self.userPersonaModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserPersona items ');
                }
            }
		});
	}

	 _self.beginEditedUserPersonaModel = function (model, formlink) {
        _self.editedUserPersonaModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserPersonaModel = function (formlink) {
        _self.candidateUserPersonaModel(dummyUserPersonaModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserPersonaModel = function (model, formlink) {
        _self.removedUserPersonaModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserPersonaModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserPersonaApi?Id=' + _self.editedUserPersonaModel().Id(), {
            data: ko.toJSON(_self.editedUserPersonaModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userPersonaModels().length; i++) {
                    if (_self.userPersonaModels()[i].Id() == _self.editedUserPersonaModel().Id()) {

                        _self.userPersonaModels.replace(_self.userPersonaModels()[i], _self.editedUserPersonaModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserPersonaModel().Id());
                }

                console.log('Success edited UserPersona item ' + _self.editedUserPersonaModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserPersonaModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserPersonaModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserPersonaApi', {
            data: ko.toJSON(_self.candidateUserPersonaModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserPersona model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserPersonaModel().Id(addedModel.Id);
				_self.addedUserPersonaModel().PersonaId(addedModel.PersonaId);
				_self.addedUserPersonaModel().UserId(addedModel.UserId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserPersona item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserPersona model.');
            }
        });
    }

	 _self.commitRemovedUserPersonaModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserPersonaModel().Id)) {
            id = _self.removedUserPersonaModel().Id();
        } else {
            id = _self.removedUserPersonaModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserPersonaApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userPersonaModels.remove(_self.removedUserPersonaModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserPersona item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserPersona item ' + id + '.');
            }
        });
    }
   
    _self.saveUserPersonaAll = function () {
        var jsonData = ko.toJSON(_self.userPersonaModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

