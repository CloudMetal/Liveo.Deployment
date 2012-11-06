
function IngredientModel(
            id,
            calories,
            foodName,
            mealId,
            order,
            carbsInGrams,
            proteinInGrams,
            fatInGrams,
            servingSize,
            servingSizeUnitsId,
            servings,
            servingsUnitsId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Calories = ko.observable(calories);
	_self.FoodName = ko.observable(foodName);
	_self.MealId = ko.observable(mealId);
	_self.Order = ko.observable(order);
	_self.CarbsInGrams = ko.observable(carbsInGrams);
	_self.ProteinInGrams = ko.observable(proteinInGrams);
	_self.FatInGrams = ko.observable(fatInGrams);
	_self.ServingSize = ko.observable(servingSize);
	_self.ServingSizeUnitsId = ko.observable(servingSizeUnitsId);
	_self.Servings = ko.observable(servings);
	_self.ServingsUnitsId = ko.observable(servingsUnitsId);

}

function Ingredient_ViewModel() {
    //#region member vars
    testVariable_Ingredient = 'Ingredient viewmodel bound';

    var _self = this;

    var dummyIngredientModel = new IngredientModel(0,0,0,0,0,0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedIngredientModel = new ko.observable(dummyIngredientModel);
    _self.editedIngredientModel = ko.observable(dummyIngredientModel);
    _self.removedIngredientModel = ko.observable(dummyIngredientModel);
	_self.selectedIngredientModel = ko.observable(dummyIngredientModel);
	_self.candidateIngredientModel = ko.observable(dummyIngredientModel);
    _self.ingredientModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllIngredientModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/IngredientApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new IngredientModel(data[i].Id, data[i].Calories, data[i].FoodName, data[i].MealId, data[i].Order, data[i].CarbsInGrams, data[i].ProteinInGrams, data[i].FatInGrams, data[i].ServingSize, data[i].ServingSizeUnitsId, data[i].Servings, data[i].ServingsUnitsId));
				}
				_self.ingredientModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Ingredient items ');
                }
            }
		});
	}

	 _self.beginEditedIngredientModel = function (model, formlink) {
        _self.editedIngredientModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateIngredientModel = function (formlink) {
        _self.candidateIngredientModel(dummyIngredientModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveIngredientModel = function (model, formlink) {
        _self.removedIngredientModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedIngredientModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/IngredientApi?Id=' + _self.editedIngredientModel().Id(), {
            data: ko.toJSON(_self.editedIngredientModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.ingredientModels().length; i++) {
                    if (_self.ingredientModels()[i].Id() == _self.editedIngredientModel().Id()) {

                        _self.ingredientModels.replace(_self.ingredientModels()[i], _self.editedIngredientModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedIngredientModel().Id());
                }

                console.log('Success edited Ingredient item ' + _self.editedIngredientModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedIngredientModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateIngredientModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/IngredientApi', {
            data: ko.toJSON(_self.candidateIngredientModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Ingredient model');
                addedModel = JSON.parse(result.responseText);
				_self.addedIngredientModel().Id(addedModel.Id);
				_self.addedIngredientModel().Calories(addedModel.Calories);
				_self.addedIngredientModel().FoodName(addedModel.FoodName);
				_self.addedIngredientModel().MealId(addedModel.MealId);
				_self.addedIngredientModel().Order(addedModel.Order);
				_self.addedIngredientModel().CarbsInGrams(addedModel.CarbsInGrams);
				_self.addedIngredientModel().ProteinInGrams(addedModel.ProteinInGrams);
				_self.addedIngredientModel().FatInGrams(addedModel.FatInGrams);
				_self.addedIngredientModel().ServingSize(addedModel.ServingSize);
				_self.addedIngredientModel().ServingSizeUnitsId(addedModel.ServingSizeUnitsId);
				_self.addedIngredientModel().Servings(addedModel.Servings);
				_self.addedIngredientModel().ServingsUnitsId(addedModel.ServingsUnitsId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Ingredient item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Ingredient model.');
            }
        });
    }

	 _self.commitRemovedIngredientModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedIngredientModel().Id)) {
            id = _self.removedIngredientModel().Id();
        } else {
            id = _self.removedIngredientModel().Id;
        }

        $.ajax('/api/Liveo.Platform/IngredientApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.ingredientModels.remove(_self.removedIngredientModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Ingredient item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Ingredient item ' + id + '.');
            }
        });
    }
   
    _self.saveIngredientAll = function () {
        var jsonData = ko.toJSON(_self.ingredientModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

