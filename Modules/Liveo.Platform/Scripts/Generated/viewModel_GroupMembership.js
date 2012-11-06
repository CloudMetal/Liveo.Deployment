
function GroupMembershipModel(
            id,
            groupId,
            joinDate,
            isApproved,
            userId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.GroupId = ko.observable(groupId);
	_self.JoinDate = ko.observable(joinDate);
	_self.IsApproved = ko.observable(isApproved);
	_self.UserId = ko.observable(userId);

}

function GroupMembership_ViewModel() {
    //#region member vars
    testVariable_GroupMembership = 'GroupMembership viewmodel bound';

    var _self = this;

    var dummyGroupMembershipModel = new GroupMembershipModel(0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedGroupMembershipModel = new ko.observable(dummyGroupMembershipModel);
    _self.editedGroupMembershipModel = ko.observable(dummyGroupMembershipModel);
    _self.removedGroupMembershipModel = ko.observable(dummyGroupMembershipModel);
	_self.selectedGroupMembershipModel = ko.observable(dummyGroupMembershipModel);
	_self.candidateGroupMembershipModel = ko.observable(dummyGroupMembershipModel);
    _self.groupMembershipModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllGroupMembershipModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/GroupMembershipApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new GroupMembershipModel(data[i].Id, data[i].GroupId, data[i].JoinDate, data[i].IsApproved, data[i].UserId));
				}
				_self.groupMembershipModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get GroupMembership items ');
                }
            }
		});
	}

	 _self.beginEditedGroupMembershipModel = function (model, formlink) {
        _self.editedGroupMembershipModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateGroupMembershipModel = function (formlink) {
        _self.candidateGroupMembershipModel(dummyGroupMembershipModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveGroupMembershipModel = function (model, formlink) {
        _self.removedGroupMembershipModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedGroupMembershipModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/GroupMembershipApi?Id=' + _self.editedGroupMembershipModel().Id(), {
            data: ko.toJSON(_self.editedGroupMembershipModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.groupMembershipModels().length; i++) {
                    if (_self.groupMembershipModels()[i].Id() == _self.editedGroupMembershipModel().Id()) {

                        _self.groupMembershipModels.replace(_self.groupMembershipModels()[i], _self.editedGroupMembershipModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedGroupMembershipModel().Id());
                }

                console.log('Success edited GroupMembership item ' + _self.editedGroupMembershipModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedGroupMembershipModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateGroupMembershipModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/GroupMembershipApi', {
            data: ko.toJSON(_self.candidateGroupMembershipModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new GroupMembership model');
                addedModel = JSON.parse(result.responseText);
				_self.addedGroupMembershipModel().Id(addedModel.Id);
				_self.addedGroupMembershipModel().GroupId(addedModel.GroupId);
				_self.addedGroupMembershipModel().JoinDate(addedModel.JoinDate);
				_self.addedGroupMembershipModel().IsApproved(addedModel.IsApproved);
				_self.addedGroupMembershipModel().UserId(addedModel.UserId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added GroupMembership item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new GroupMembership model.');
            }
        });
    }

	 _self.commitRemovedGroupMembershipModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedGroupMembershipModel().Id)) {
            id = _self.removedGroupMembershipModel().Id();
        } else {
            id = _self.removedGroupMembershipModel().Id;
        }

        $.ajax('/api/Liveo.Platform/GroupMembershipApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.groupMembershipModels.remove(_self.removedGroupMembershipModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed GroupMembership item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove GroupMembership item ' + id + '.');
            }
        });
    }
   
    _self.saveGroupMembershipAll = function () {
        var jsonData = ko.toJSON(_self.groupMembershipModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

