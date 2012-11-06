
function GoalModel(
            id,
            name,
            description,
            accomplishDate,
            userId,
            goalTypeId,
            isDeleted) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);
	_self.AccomplishDate = ko.observable(accomplishDate);
	_self.UserId = ko.observable(userId);
	_self.GoalTypeId = ko.observable(goalTypeId);
	_self.IsDeleted = ko.observable(isDeleted);

}

function Goal_ViewModel() {
    //#region member vars
    testVariable_Goal = 'Goal viewmodel bound';

    var _self = this;

    var dummyGoalModel = new GoalModel(0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedGoalModel = new ko.observable(dummyGoalModel);
    _self.editedGoalModel = ko.observable(dummyGoalModel);
    _self.removedGoalModel = ko.observable(dummyGoalModel);
	_self.selectedGoalModel = ko.observable(dummyGoalModel);
	_self.candidateGoalModel = ko.observable(dummyGoalModel);
    _self.goalModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllGoalModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/GoalApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new GoalModel(data[i].Id, data[i].Name, data[i].Description, data[i].AccomplishDate, data[i].UserId, data[i].GoalTypeId, data[i].IsDeleted));
				}
				_self.goalModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Goal items ');
                }
            }
		});
	}

	 _self.beginEditedGoalModel = function (model, formlink) {
        _self.editedGoalModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateGoalModel = function (formlink) {
        _self.candidateGoalModel(dummyGoalModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveGoalModel = function (model, formlink) {
        _self.removedGoalModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedGoalModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/GoalApi?Id=' + _self.editedGoalModel().Id(), {
            data: ko.toJSON(_self.editedGoalModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.goalModels().length; i++) {
                    if (_self.goalModels()[i].Id() == _self.editedGoalModel().Id()) {

                        _self.goalModels.replace(_self.goalModels()[i], _self.editedGoalModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedGoalModel().Id());
                }

                console.log('Success edited Goal item ' + _self.editedGoalModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedGoalModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateGoalModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/GoalApi', {
            data: ko.toJSON(_self.candidateGoalModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Goal model');
                addedModel = JSON.parse(result.responseText);
				_self.addedGoalModel().Id(addedModel.Id);
				_self.addedGoalModel().Name(addedModel.Name);
				_self.addedGoalModel().Description(addedModel.Description);
				_self.addedGoalModel().AccomplishDate(addedModel.AccomplishDate);
				_self.addedGoalModel().UserId(addedModel.UserId);
				_self.addedGoalModel().GoalTypeId(addedModel.GoalTypeId);
				_self.addedGoalModel().IsDeleted(addedModel.IsDeleted);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Goal item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Goal model.');
            }
        });
    }

	 _self.commitRemovedGoalModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedGoalModel().Id)) {
            id = _self.removedGoalModel().Id();
        } else {
            id = _self.removedGoalModel().Id;
        }

        $.ajax('/api/Liveo.Platform/GoalApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.goalModels.remove(_self.removedGoalModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Goal item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Goal item ' + id + '.');
            }
        });
    }
   
    _self.saveGoalAll = function () {
        var jsonData = ko.toJSON(_self.goalModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

