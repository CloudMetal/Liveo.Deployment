
function ExerciseModel(
            id,
            name,
            description,
            durationInMinutes,
            caloriesBurnedManualOverride,
            repsWeight,
            searchTags,
            dayOfWeekId,
            pictureUrl,
            isLibrary,
            programCycleId,
            exerciseTypeId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);
	_self.DurationInMinutes = ko.observable(durationInMinutes);
	_self.CaloriesBurnedManualOverride = ko.observable(caloriesBurnedManualOverride);
	_self.RepsWeight = ko.observable(repsWeight);
	_self.SearchTags = ko.observable(searchTags);
	_self.DayOfWeekId = ko.observable(dayOfWeekId);
	_self.PictureUrl = ko.observable(pictureUrl);
	_self.IsLibrary = ko.observable(isLibrary);
	_self.ProgramCycleId = ko.observable(programCycleId);
	_self.ExerciseTypeId = ko.observable(exerciseTypeId);

}

function Exercise_ViewModel() {
    //#region member vars
    testVariable_Exercise = 'Exercise viewmodel bound';

    var _self = this;

    var dummyExerciseModel = new ExerciseModel(0,0,0,0,0,0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedExerciseModel = new ko.observable(dummyExerciseModel);
    _self.editedExerciseModel = ko.observable(dummyExerciseModel);
    _self.removedExerciseModel = ko.observable(dummyExerciseModel);
	_self.selectedExerciseModel = ko.observable(dummyExerciseModel);
	_self.candidateExerciseModel = ko.observable(dummyExerciseModel);
    _self.exerciseModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllExerciseModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ExerciseApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ExerciseModel(data[i].Id, data[i].Name, data[i].Description, data[i].DurationInMinutes, data[i].CaloriesBurnedManualOverride, data[i].RepsWeight, data[i].SearchTags, data[i].DayOfWeekId, data[i].PictureUrl, data[i].IsLibrary, data[i].ProgramCycleId, data[i].ExerciseTypeId));
				}
				_self.exerciseModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Exercise items ');
                }
            }
		});
	}

	 _self.beginEditedExerciseModel = function (model, formlink) {
        _self.editedExerciseModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateExerciseModel = function (formlink) {
        _self.candidateExerciseModel(dummyExerciseModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveExerciseModel = function (model, formlink) {
        _self.removedExerciseModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedExerciseModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ExerciseApi?Id=' + _self.editedExerciseModel().Id(), {
            data: ko.toJSON(_self.editedExerciseModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.exerciseModels().length; i++) {
                    if (_self.exerciseModels()[i].Id() == _self.editedExerciseModel().Id()) {

                        _self.exerciseModels.replace(_self.exerciseModels()[i], _self.editedExerciseModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedExerciseModel().Id());
                }

                console.log('Success edited Exercise item ' + _self.editedExerciseModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedExerciseModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateExerciseModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ExerciseApi', {
            data: ko.toJSON(_self.candidateExerciseModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Exercise model');
                addedModel = JSON.parse(result.responseText);
				_self.addedExerciseModel().Id(addedModel.Id);
				_self.addedExerciseModel().Name(addedModel.Name);
				_self.addedExerciseModel().Description(addedModel.Description);
				_self.addedExerciseModel().DurationInMinutes(addedModel.DurationInMinutes);
				_self.addedExerciseModel().CaloriesBurnedManualOverride(addedModel.CaloriesBurnedManualOverride);
				_self.addedExerciseModel().RepsWeight(addedModel.RepsWeight);
				_self.addedExerciseModel().SearchTags(addedModel.SearchTags);
				_self.addedExerciseModel().DayOfWeekId(addedModel.DayOfWeekId);
				_self.addedExerciseModel().PictureUrl(addedModel.PictureUrl);
				_self.addedExerciseModel().IsLibrary(addedModel.IsLibrary);
				_self.addedExerciseModel().ProgramCycleId(addedModel.ProgramCycleId);
				_self.addedExerciseModel().ExerciseTypeId(addedModel.ExerciseTypeId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Exercise item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Exercise model.');
            }
        });
    }

	 _self.commitRemovedExerciseModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedExerciseModel().Id)) {
            id = _self.removedExerciseModel().Id();
        } else {
            id = _self.removedExerciseModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ExerciseApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.exerciseModels.remove(_self.removedExerciseModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Exercise item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Exercise item ' + id + '.');
            }
        });
    }
   
    _self.saveExerciseAll = function () {
        var jsonData = ko.toJSON(_self.exerciseModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

