
function GoalTypeModel(
            id,
            name,
            description) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);

}

function GoalType_ViewModel() {
    //#region member vars
    testVariable_GoalType = 'GoalType viewmodel bound';

    var _self = this;

    var dummyGoalTypeModel = new GoalTypeModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedGoalTypeModel = new ko.observable(dummyGoalTypeModel);
    _self.editedGoalTypeModel = ko.observable(dummyGoalTypeModel);
    _self.removedGoalTypeModel = ko.observable(dummyGoalTypeModel);
	_self.selectedGoalTypeModel = ko.observable(dummyGoalTypeModel);
	_self.candidateGoalTypeModel = ko.observable(dummyGoalTypeModel);
    _self.goalTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllGoalTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/GoalTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new GoalTypeModel(data[i].Id, data[i].Name, data[i].Description));
				}
				_self.goalTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get GoalType items ');
                }
            }
		});
	}

	 _self.beginEditedGoalTypeModel = function (model, formlink) {
        _self.editedGoalTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateGoalTypeModel = function (formlink) {
        _self.candidateGoalTypeModel(dummyGoalTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveGoalTypeModel = function (model, formlink) {
        _self.removedGoalTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedGoalTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/GoalTypeApi?Id=' + _self.editedGoalTypeModel().Id(), {
            data: ko.toJSON(_self.editedGoalTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.goalTypeModels().length; i++) {
                    if (_self.goalTypeModels()[i].Id() == _self.editedGoalTypeModel().Id()) {

                        _self.goalTypeModels.replace(_self.goalTypeModels()[i], _self.editedGoalTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedGoalTypeModel().Id());
                }

                console.log('Success edited GoalType item ' + _self.editedGoalTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedGoalTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateGoalTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/GoalTypeApi', {
            data: ko.toJSON(_self.candidateGoalTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new GoalType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedGoalTypeModel().Id(addedModel.Id);
				_self.addedGoalTypeModel().Name(addedModel.Name);
				_self.addedGoalTypeModel().Description(addedModel.Description);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added GoalType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new GoalType model.');
            }
        });
    }

	 _self.commitRemovedGoalTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedGoalTypeModel().Id)) {
            id = _self.removedGoalTypeModel().Id();
        } else {
            id = _self.removedGoalTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/GoalTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.goalTypeModels.remove(_self.removedGoalTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed GoalType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove GoalType item ' + id + '.');
            }
        });
    }
   
    _self.saveGoalTypeAll = function () {
        var jsonData = ko.toJSON(_self.goalTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

