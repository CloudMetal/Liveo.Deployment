
function UserIngredientModel(
            id,
            ingredientId,
            userMealId,
            actualServingSize,
            actualServings) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.IngredientId = ko.observable(ingredientId);
	_self.UserMealId = ko.observable(userMealId);
	_self.ActualServingSize = ko.observable(actualServingSize);
	_self.ActualServings = ko.observable(actualServings);

}

function UserIngredient_ViewModel() {
    //#region member vars
    testVariable_UserIngredient = 'UserIngredient viewmodel bound';

    var _self = this;

    var dummyUserIngredientModel = new UserIngredientModel(0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserIngredientModel = new ko.observable(dummyUserIngredientModel);
    _self.editedUserIngredientModel = ko.observable(dummyUserIngredientModel);
    _self.removedUserIngredientModel = ko.observable(dummyUserIngredientModel);
	_self.selectedUserIngredientModel = ko.observable(dummyUserIngredientModel);
	_self.candidateUserIngredientModel = ko.observable(dummyUserIngredientModel);
    _self.userIngredientModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserIngredientModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserIngredientApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserIngredientModel(data[i].Id, data[i].IngredientId, data[i].UserMealId, data[i].ActualServingSize, data[i].ActualServings));
				}
				_self.userIngredientModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UserIngredient items ');
                }
            }
		});
	}

	 _self.beginEditedUserIngredientModel = function (model, formlink) {
        _self.editedUserIngredientModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserIngredientModel = function (formlink) {
        _self.candidateUserIngredientModel(dummyUserIngredientModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserIngredientModel = function (model, formlink) {
        _self.removedUserIngredientModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserIngredientModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserIngredientApi?Id=' + _self.editedUserIngredientModel().Id(), {
            data: ko.toJSON(_self.editedUserIngredientModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userIngredientModels().length; i++) {
                    if (_self.userIngredientModels()[i].Id() == _self.editedUserIngredientModel().Id()) {

                        _self.userIngredientModels.replace(_self.userIngredientModels()[i], _self.editedUserIngredientModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserIngredientModel().Id());
                }

                console.log('Success edited UserIngredient item ' + _self.editedUserIngredientModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserIngredientModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserIngredientModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserIngredientApi', {
            data: ko.toJSON(_self.candidateUserIngredientModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UserIngredient model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserIngredientModel().Id(addedModel.Id);
				_self.addedUserIngredientModel().IngredientId(addedModel.IngredientId);
				_self.addedUserIngredientModel().UserMealId(addedModel.UserMealId);
				_self.addedUserIngredientModel().ActualServingSize(addedModel.ActualServingSize);
				_self.addedUserIngredientModel().ActualServings(addedModel.ActualServings);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UserIngredient item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UserIngredient model.');
            }
        });
    }

	 _self.commitRemovedUserIngredientModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserIngredientModel().Id)) {
            id = _self.removedUserIngredientModel().Id();
        } else {
            id = _self.removedUserIngredientModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserIngredientApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userIngredientModels.remove(_self.removedUserIngredientModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UserIngredient item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UserIngredient item ' + id + '.');
            }
        });
    }
   
    _self.saveUserIngredientAll = function () {
        var jsonData = ko.toJSON(_self.userIngredientModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

