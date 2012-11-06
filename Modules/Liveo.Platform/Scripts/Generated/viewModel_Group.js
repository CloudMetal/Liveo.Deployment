
function GroupModel(
            id,
            name) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);

}

function Group_ViewModel() {
    //#region member vars
    testVariable_Group = 'Group viewmodel bound';

    var _self = this;

    var dummyGroupModel = new GroupModel(0,0);
    var obsModels = new Array();
    var data;
    _self.addedGroupModel = new ko.observable(dummyGroupModel);
    _self.editedGroupModel = ko.observable(dummyGroupModel);
    _self.removedGroupModel = ko.observable(dummyGroupModel);
	_self.selectedGroupModel = ko.observable(dummyGroupModel);
	_self.candidateGroupModel = ko.observable(dummyGroupModel);
    _self.groupModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllGroupModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/GroupApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new GroupModel(data[i].Id, data[i].Name));
				}
				_self.groupModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Group items ');
                }
            }
		});
	}

	 _self.beginEditedGroupModel = function (model, formlink) {
        _self.editedGroupModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateGroupModel = function (formlink) {
        _self.candidateGroupModel(dummyGroupModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveGroupModel = function (model, formlink) {
        _self.removedGroupModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedGroupModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/GroupApi?Id=' + _self.editedGroupModel().Id(), {
            data: ko.toJSON(_self.editedGroupModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.groupModels().length; i++) {
                    if (_self.groupModels()[i].Id() == _self.editedGroupModel().Id()) {

                        _self.groupModels.replace(_self.groupModels()[i], _self.editedGroupModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedGroupModel().Id());
                }

                console.log('Success edited Group item ' + _self.editedGroupModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedGroupModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateGroupModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/GroupApi', {
            data: ko.toJSON(_self.candidateGroupModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Group model');
                addedModel = JSON.parse(result.responseText);
				_self.addedGroupModel().Id(addedModel.Id);
				_self.addedGroupModel().Name(addedModel.Name);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Group item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Group model.');
            }
        });
    }

	 _self.commitRemovedGroupModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedGroupModel().Id)) {
            id = _self.removedGroupModel().Id();
        } else {
            id = _self.removedGroupModel().Id;
        }

        $.ajax('/api/Liveo.Platform/GroupApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.groupModels.remove(_self.removedGroupModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Group item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Group item ' + id + '.');
            }
        });
    }
   
    _self.saveGroupAll = function () {
        var jsonData = ko.toJSON(_self.groupModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

