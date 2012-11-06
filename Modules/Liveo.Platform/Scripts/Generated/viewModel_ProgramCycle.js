
function ProgramCycleModel(
            id,
            programId,
            name,
            description,
            order,
            numberOfWeeks,
            pictureUrl) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.ProgramId = ko.observable(programId);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);
	_self.Order = ko.observable(order);
	_self.NumberOfWeeks = ko.observable(numberOfWeeks);
	_self.PictureUrl = ko.observable(pictureUrl);

}

function ProgramCycle_ViewModel() {
    //#region member vars
    testVariable_ProgramCycle = 'ProgramCycle viewmodel bound';

    var _self = this;

    var dummyProgramCycleModel = new ProgramCycleModel(0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedProgramCycleModel = new ko.observable(dummyProgramCycleModel);
    _self.editedProgramCycleModel = ko.observable(dummyProgramCycleModel);
    _self.removedProgramCycleModel = ko.observable(dummyProgramCycleModel);
	_self.selectedProgramCycleModel = ko.observable(dummyProgramCycleModel);
	_self.candidateProgramCycleModel = ko.observable(dummyProgramCycleModel);
    _self.programCycleModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllProgramCycleModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ProgramCycleApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ProgramCycleModel(data[i].Id, data[i].ProgramId, data[i].Name, data[i].Description, data[i].Order, data[i].NumberOfWeeks, data[i].PictureUrl));
				}
				_self.programCycleModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get ProgramCycle items ');
                }
            }
		});
	}

	 _self.beginEditedProgramCycleModel = function (model, formlink) {
        _self.editedProgramCycleModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateProgramCycleModel = function (formlink) {
        _self.candidateProgramCycleModel(dummyProgramCycleModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveProgramCycleModel = function (model, formlink) {
        _self.removedProgramCycleModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedProgramCycleModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ProgramCycleApi?Id=' + _self.editedProgramCycleModel().Id(), {
            data: ko.toJSON(_self.editedProgramCycleModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.programCycleModels().length; i++) {
                    if (_self.programCycleModels()[i].Id() == _self.editedProgramCycleModel().Id()) {

                        _self.programCycleModels.replace(_self.programCycleModels()[i], _self.editedProgramCycleModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedProgramCycleModel().Id());
                }

                console.log('Success edited ProgramCycle item ' + _self.editedProgramCycleModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedProgramCycleModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateProgramCycleModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ProgramCycleApi', {
            data: ko.toJSON(_self.candidateProgramCycleModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new ProgramCycle model');
                addedModel = JSON.parse(result.responseText);
				_self.addedProgramCycleModel().Id(addedModel.Id);
				_self.addedProgramCycleModel().ProgramId(addedModel.ProgramId);
				_self.addedProgramCycleModel().Name(addedModel.Name);
				_self.addedProgramCycleModel().Description(addedModel.Description);
				_self.addedProgramCycleModel().Order(addedModel.Order);
				_self.addedProgramCycleModel().NumberOfWeeks(addedModel.NumberOfWeeks);
				_self.addedProgramCycleModel().PictureUrl(addedModel.PictureUrl);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added ProgramCycle item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new ProgramCycle model.');
            }
        });
    }

	 _self.commitRemovedProgramCycleModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedProgramCycleModel().Id)) {
            id = _self.removedProgramCycleModel().Id();
        } else {
            id = _self.removedProgramCycleModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ProgramCycleApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.programCycleModels.remove(_self.removedProgramCycleModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed ProgramCycle item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove ProgramCycle item ' + id + '.');
            }
        });
    }
   
    _self.saveProgramCycleAll = function () {
        var jsonData = ko.toJSON(_self.programCycleModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

