
function ExerciseTypeModel(
            id,
            name,
            caloriesBurnedPerHour) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.CaloriesBurnedPerHour = ko.observable(caloriesBurnedPerHour);

}

function ExerciseType_ViewModel() {
    //#region member vars
    testVariable_ExerciseType = 'ExerciseType viewmodel bound';

    var _self = this;

    var dummyExerciseTypeModel = new ExerciseTypeModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedExerciseTypeModel = new ko.observable(dummyExerciseTypeModel);
    _self.editedExerciseTypeModel = ko.observable(dummyExerciseTypeModel);
    _self.removedExerciseTypeModel = ko.observable(dummyExerciseTypeModel);
	_self.selectedExerciseTypeModel = ko.observable(dummyExerciseTypeModel);
	_self.candidateExerciseTypeModel = ko.observable(dummyExerciseTypeModel);
    _self.exerciseTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllExerciseTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ExerciseTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ExerciseTypeModel(data[i].Id, data[i].Name, data[i].CaloriesBurnedPerHour));
				}
				_self.exerciseTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get ExerciseType items ');
                }
            }
		});
	}

	 _self.beginEditedExerciseTypeModel = function (model, formlink) {
        _self.editedExerciseTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateExerciseTypeModel = function (formlink) {
        _self.candidateExerciseTypeModel(dummyExerciseTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveExerciseTypeModel = function (model, formlink) {
        _self.removedExerciseTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedExerciseTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ExerciseTypeApi?Id=' + _self.editedExerciseTypeModel().Id(), {
            data: ko.toJSON(_self.editedExerciseTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.exerciseTypeModels().length; i++) {
                    if (_self.exerciseTypeModels()[i].Id() == _self.editedExerciseTypeModel().Id()) {

                        _self.exerciseTypeModels.replace(_self.exerciseTypeModels()[i], _self.editedExerciseTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedExerciseTypeModel().Id());
                }

                console.log('Success edited ExerciseType item ' + _self.editedExerciseTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedExerciseTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateExerciseTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ExerciseTypeApi', {
            data: ko.toJSON(_self.candidateExerciseTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new ExerciseType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedExerciseTypeModel().Id(addedModel.Id);
				_self.addedExerciseTypeModel().Name(addedModel.Name);
				_self.addedExerciseTypeModel().CaloriesBurnedPerHour(addedModel.CaloriesBurnedPerHour);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added ExerciseType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new ExerciseType model.');
            }
        });
    }

	 _self.commitRemovedExerciseTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedExerciseTypeModel().Id)) {
            id = _self.removedExerciseTypeModel().Id();
        } else {
            id = _self.removedExerciseTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ExerciseTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.exerciseTypeModels.remove(_self.removedExerciseTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed ExerciseType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove ExerciseType item ' + id + '.');
            }
        });
    }
   
    _self.saveExerciseTypeAll = function () {
        var jsonData = ko.toJSON(_self.exerciseTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

