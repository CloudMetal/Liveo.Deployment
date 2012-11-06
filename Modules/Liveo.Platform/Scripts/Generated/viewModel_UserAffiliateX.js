
function UserAffiliateXModel(
            id,
            isAdmin,
            userId,
            affiliateId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.IsAdmin = ko.observable(isAdmin);
	_self.UserId = ko.observable(userId);
	_self.AffiliateId = ko.observable(affiliateId);

}

function UserAffiliateX_ViewModel() {
    //#region member vars
    testVariable_UserAffiliateX = 'UserAffiliateX viewmodel bound';

    var _self = this;

    var dummyUserAffiliateXModel = new UserAffiliateXModel(0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserAffiliateXModel = new ko.observable(dummyUserAffiliateXModel);
    _self.editedUserAffiliateXModel = ko.observable(dummyUserAffiliateXModel);
    _self.removedUserAffiliateXModel = ko.observable(dummyUserAffiliateXModel);
	_self.selectedUserAffiliateXModel = ko.observable(dummyUserAffiliateXModel);
	_self.candidateUserAffiliateXModel = ko.observable(dummyUserAffiliateXModel);
    _self.userAffiliateXModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserAffiliateXModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserAffiliateXApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserAffiliateXModel(data[i].Id, data[i].IsAdmin, data[i].UserId, data[i].AffiliateId));
				}
				_self.userAffiliateXModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserAffiliateX items ');
                }
            }
		});
	}

	 _self.beginEditedUserAffiliateXModel = function (model, formlink) {
        _self.editedUserAffiliateXModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserAffiliateXModel = function (formlink) {
        _self.candidateUserAffiliateXModel(dummyUserAffiliateXModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserAffiliateXModel = function (model, formlink) {
        _self.removedUserAffiliateXModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserAffiliateXModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserAffiliateXApi?Id=' + _self.editedUserAffiliateXModel().Id(), {
            data: ko.toJSON(_self.editedUserAffiliateXModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userAffiliateXModels().length; i++) {
                    if (_self.userAffiliateXModels()[i].Id() == _self.editedUserAffiliateXModel().Id()) {

                        _self.userAffiliateXModels.replace(_self.userAffiliateXModels()[i], _self.editedUserAffiliateXModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserAffiliateXModel().Id());
                }

                console.log('Success edited UserAffiliateX item ' + _self.editedUserAffiliateXModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserAffiliateXModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserAffiliateXModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserAffiliateXApi', {
            data: ko.toJSON(_self.candidateUserAffiliateXModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserAffiliateX model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserAffiliateXModel().Id(addedModel.Id);
				_self.addedUserAffiliateXModel().IsAdmin(addedModel.IsAdmin);
				_self.addedUserAffiliateXModel().UserId(addedModel.UserId);
				_self.addedUserAffiliateXModel().AffiliateId(addedModel.AffiliateId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserAffiliateX item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserAffiliateX model.');
            }
        });
    }

	 _self.commitRemovedUserAffiliateXModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserAffiliateXModel().Id)) {
            id = _self.removedUserAffiliateXModel().Id();
        } else {
            id = _self.removedUserAffiliateXModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserAffiliateXApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userAffiliateXModels.remove(_self.removedUserAffiliateXModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserAffiliateX item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserAffiliateX item ' + id + '.');
            }
        });
    }
   
    _self.saveUserAffiliateXAll = function () {
        var jsonData = ko.toJSON(_self.userAffiliateXModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

