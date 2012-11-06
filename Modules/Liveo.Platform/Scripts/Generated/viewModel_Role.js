
function RoleModel(
            id,
            name) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);

}

function Role_ViewModel() {
    //#region member vars
    testVariable_Role = 'Role viewmodel bound';

    var _self = this;

    var dummyRoleModel = new RoleModel(0,0);
    var obsModels = new Array();
    var data;
    _self.addedRoleModel = new ko.observable(dummyRoleModel);
    _self.editedRoleModel = ko.observable(dummyRoleModel);
    _self.removedRoleModel = ko.observable(dummyRoleModel);
	_self.selectedRoleModel = ko.observable(dummyRoleModel);
	_self.candidateRoleModel = ko.observable(dummyRoleModel);
    _self.roleModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllRoleModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/RoleApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new RoleModel(data[i].Id, data[i].Name));
				}
				_self.roleModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Role items ');
                }
            }
		});
	}

	 _self.beginEditedRoleModel = function (model, formlink) {
        _self.editedRoleModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateRoleModel = function (formlink) {
        _self.candidateRoleModel(dummyRoleModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveRoleModel = function (model, formlink) {
        _self.removedRoleModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedRoleModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/RoleApi?Id=' + _self.editedRoleModel().Id(), {
            data: ko.toJSON(_self.editedRoleModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.roleModels().length; i++) {
                    if (_self.roleModels()[i].Id() == _self.editedRoleModel().Id()) {

                        _self.roleModels.replace(_self.roleModels()[i], _self.editedRoleModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedRoleModel().Id());
                }

                console.log('Success edited Role item ' + _self.editedRoleModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedRoleModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateRoleModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/RoleApi', {
            data: ko.toJSON(_self.candidateRoleModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Role model');
                addedModel = JSON.parse(result.responseText);
				_self.addedRoleModel().Id(addedModel.Id);
				_self.addedRoleModel().Name(addedModel.Name);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Role item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Role model.');
            }
        });
    }

	 _self.commitRemovedRoleModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedRoleModel().Id)) {
            id = _self.removedRoleModel().Id();
        } else {
            id = _self.removedRoleModel().Id;
        }

        $.ajax('/api/Liveo.Platform/RoleApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.roleModels.remove(_self.removedRoleModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Role item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Role item ' + id + '.');
            }
        });
    }
   
    _self.saveRoleAll = function () {
        var jsonData = ko.toJSON(_self.roleModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

