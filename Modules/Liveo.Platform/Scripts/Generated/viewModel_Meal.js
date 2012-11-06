
function MealModel(
            id,
            order,
            mealTypeId,
            programCycleId,
            name,
            description,
            caloriesOverride,
            pictureUrl,
            dayOfWeekId,
            parentMealId,
            isLibrary) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Order = ko.observable(order);
	_self.MealTypeId = ko.observable(mealTypeId);
	_self.ProgramCycleId = ko.observable(programCycleId);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);
	_self.CaloriesOverride = ko.observable(caloriesOverride);
	_self.PictureUrl = ko.observable(pictureUrl);
	_self.DayOfWeekId = ko.observable(dayOfWeekId);
	_self.ParentMealId = ko.observable(parentMealId);
	_self.IsLibrary = ko.observable(isLibrary);

}

function Meal_ViewModel() {
    //#region member vars
    testVariable_Meal = 'Meal viewmodel bound';

    var _self = this;

    var dummyMealModel = new MealModel(0,0,0,0,0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedMealModel = new ko.observable(dummyMealModel);
    _self.editedMealModel = ko.observable(dummyMealModel);
    _self.removedMealModel = ko.observable(dummyMealModel);
	_self.selectedMealModel = ko.observable(dummyMealModel);
	_self.candidateMealModel = ko.observable(dummyMealModel);
    _self.mealModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllMealModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/MealApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new MealModel(data[i].Id, data[i].Order, data[i].MealTypeId, data[i].ProgramCycleId, data[i].Name, data[i].Description, data[i].CaloriesOverride, data[i].PictureUrl, data[i].DayOfWeekId, data[i].ParentMealId, data[i].IsLibrary));
				}
				_self.mealModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Meal items ');
                }
            }
		});
	}

	 _self.beginEditedMealModel = function (model, formlink) {
        _self.editedMealModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateMealModel = function (formlink) {
        _self.candidateMealModel(dummyMealModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveMealModel = function (model, formlink) {
        _self.removedMealModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedMealModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/MealApi?Id=' + _self.editedMealModel().Id(), {
            data: ko.toJSON(_self.editedMealModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.mealModels().length; i++) {
                    if (_self.mealModels()[i].Id() == _self.editedMealModel().Id()) {

                        _self.mealModels.replace(_self.mealModels()[i], _self.editedMealModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedMealModel().Id());
                }

                console.log('Success edited Meal item ' + _self.editedMealModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedMealModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateMealModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/MealApi', {
            data: ko.toJSON(_self.candidateMealModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Meal model');
                addedModel = JSON.parse(result.responseText);
				_self.addedMealModel().Id(addedModel.Id);
				_self.addedMealModel().Order(addedModel.Order);
				_self.addedMealModel().MealTypeId(addedModel.MealTypeId);
				_self.addedMealModel().ProgramCycleId(addedModel.ProgramCycleId);
				_self.addedMealModel().Name(addedModel.Name);
				_self.addedMealModel().Description(addedModel.Description);
				_self.addedMealModel().CaloriesOverride(addedModel.CaloriesOverride);
				_self.addedMealModel().PictureUrl(addedModel.PictureUrl);
				_self.addedMealModel().DayOfWeekId(addedModel.DayOfWeekId);
				_self.addedMealModel().ParentMealId(addedModel.ParentMealId);
				_self.addedMealModel().IsLibrary(addedModel.IsLibrary);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Meal item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Meal model.');
            }
        });
    }

	 _self.commitRemovedMealModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedMealModel().Id)) {
            id = _self.removedMealModel().Id();
        } else {
            id = _self.removedMealModel().Id;
        }

        $.ajax('/api/Liveo.Platform/MealApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.mealModels.remove(_self.removedMealModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Meal item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Meal item ' + id + '.');
            }
        });
    }
   
    _self.saveMealAll = function () {
        var jsonData = ko.toJSON(_self.mealModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

