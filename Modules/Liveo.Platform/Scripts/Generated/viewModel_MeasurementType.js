
function MeasurementTypeModel(
            id,
            name,
            description) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);

}

function MeasurementType_ViewModel() {
    //#region member vars
    testVariable_MeasurementType = 'MeasurementType viewmodel bound';

    var _self = this;

    var dummyMeasurementTypeModel = new MeasurementTypeModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedMeasurementTypeModel = new ko.observable(dummyMeasurementTypeModel);
    _self.editedMeasurementTypeModel = ko.observable(dummyMeasurementTypeModel);
    _self.removedMeasurementTypeModel = ko.observable(dummyMeasurementTypeModel);
	_self.selectedMeasurementTypeModel = ko.observable(dummyMeasurementTypeModel);
	_self.candidateMeasurementTypeModel = ko.observable(dummyMeasurementTypeModel);
    _self.measurementTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllMeasurementTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/MeasurementTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new MeasurementTypeModel(data[i].Id, data[i].Name, data[i].Description));
				}
				_self.measurementTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get MeasurementType items ');
                }
            }
		});
	}

	 _self.beginEditedMeasurementTypeModel = function (model, formlink) {
        _self.editedMeasurementTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateMeasurementTypeModel = function (formlink) {
        _self.candidateMeasurementTypeModel(dummyMeasurementTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveMeasurementTypeModel = function (model, formlink) {
        _self.removedMeasurementTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedMeasurementTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/MeasurementTypeApi?Id=' + _self.editedMeasurementTypeModel().Id(), {
            data: ko.toJSON(_self.editedMeasurementTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.measurementTypeModels().length; i++) {
                    if (_self.measurementTypeModels()[i].Id() == _self.editedMeasurementTypeModel().Id()) {

                        _self.measurementTypeModels.replace(_self.measurementTypeModels()[i], _self.editedMeasurementTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedMeasurementTypeModel().Id());
                }

                console.log('Success edited MeasurementType item ' + _self.editedMeasurementTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedMeasurementTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateMeasurementTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/MeasurementTypeApi', {
            data: ko.toJSON(_self.candidateMeasurementTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new MeasurementType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedMeasurementTypeModel().Id(addedModel.Id);
				_self.addedMeasurementTypeModel().Name(addedModel.Name);
				_self.addedMeasurementTypeModel().Description(addedModel.Description);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added MeasurementType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new MeasurementType model.');
            }
        });
    }

	 _self.commitRemovedMeasurementTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedMeasurementTypeModel().Id)) {
            id = _self.removedMeasurementTypeModel().Id();
        } else {
            id = _self.removedMeasurementTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/MeasurementTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.measurementTypeModels.remove(_self.removedMeasurementTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed MeasurementType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove MeasurementType item ' + id + '.');
            }
        });
    }
   
    _self.saveMeasurementTypeAll = function () {
        var jsonData = ko.toJSON(_self.measurementTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

