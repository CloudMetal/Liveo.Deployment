
function UserMealModel(
            id,
            mealId,
            userId,
            userProgramCycleId,
            mealDate) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.MealId = ko.observable(mealId);
	_self.UserId = ko.observable(userId);
	_self.UserProgramCycleId = ko.observable(userProgramCycleId);
	_self.MealDate = ko.observable(mealDate);

}

function UserMeal_ViewModel() {
    //#region member vars
    testVariable_UserMeal = 'UserMeal viewmodel bound';

    var _self = this;

    var dummyUserMealModel = new UserMealModel(0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserMealModel = new ko.observable(dummyUserMealModel);
    _self.editedUserMealModel = ko.observable(dummyUserMealModel);
    _self.removedUserMealModel = ko.observable(dummyUserMealModel);
	_self.selectedUserMealModel = ko.observable(dummyUserMealModel);
	_self.candidateUserMealModel = ko.observable(dummyUserMealModel);
    _self.userMealModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserMealModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserMealApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserMealModel(data[i].Id, data[i].MealId, data[i].UserId, data[i].UserProgramCycleId, data[i].MealDate));
				}
				_self.userMealModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserMeal items ');
                }
            }
		});
	}

	 _self.beginEditedUserMealModel = function (model, formlink) {
        _self.editedUserMealModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserMealModel = function (formlink) {
        _self.candidateUserMealModel(dummyUserMealModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserMealModel = function (model, formlink) {
        _self.removedUserMealModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserMealModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserMealApi?Id=' + _self.editedUserMealModel().Id(), {
            data: ko.toJSON(_self.editedUserMealModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userMealModels().length; i++) {
                    if (_self.userMealModels()[i].Id() == _self.editedUserMealModel().Id()) {

                        _self.userMealModels.replace(_self.userMealModels()[i], _self.editedUserMealModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserMealModel().Id());
                }

                console.log('Success edited UserMeal item ' + _self.editedUserMealModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserMealModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserMealModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserMealApi', {
            data: ko.toJSON(_self.candidateUserMealModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserMeal model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserMealModel().Id(addedModel.Id);
				_self.addedUserMealModel().MealId(addedModel.MealId);
				_self.addedUserMealModel().UserId(addedModel.UserId);
				_self.addedUserMealModel().UserProgramCycleId(addedModel.UserProgramCycleId);
				_self.addedUserMealModel().MealDate(addedModel.MealDate);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserMeal item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserMeal model.');
            }
        });
    }

	 _self.commitRemovedUserMealModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserMealModel().Id)) {
            id = _self.removedUserMealModel().Id();
        } else {
            id = _self.removedUserMealModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserMealApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userMealModels.remove(_self.removedUserMealModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserMeal item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserMeal item ' + id + '.');
            }
        });
    }
   
    _self.saveUserMealAll = function () {
        var jsonData = ko.toJSON(_self.userMealModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

