
function MeasurementModel(
            id,
            measurementTypeId,
            title,
            measurementDate,
            createDate,
            lastUpdateDate,
            userId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.MeasurementTypeId = ko.observable(measurementTypeId);
	_self.Title = ko.observable(title);
	_self.MeasurementDate = ko.observable(measurementDate);
	_self.CreateDate = ko.observable(createDate);
	_self.LastUpdateDate = ko.observable(lastUpdateDate);
	_self.UserId = ko.observable(userId);

}

function Measurement_ViewModel() {
    //#region member vars
    testVariable_Measurement = 'Measurement viewmodel bound';

    var _self = this;

    var dummyMeasurementModel = new MeasurementModel(0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedMeasurementModel = new ko.observable(dummyMeasurementModel);
    _self.editedMeasurementModel = ko.observable(dummyMeasurementModel);
    _self.removedMeasurementModel = ko.observable(dummyMeasurementModel);
	_self.selectedMeasurementModel = ko.observable(dummyMeasurementModel);
	_self.candidateMeasurementModel = ko.observable(dummyMeasurementModel);
    _self.measurementModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllMeasurementModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/MeasurementApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new MeasurementModel(data[i].Id, data[i].MeasurementTypeId, data[i].Title, data[i].MeasurementDate, data[i].CreateDate, data[i].LastUpdateDate, data[i].UserId));
				}
				_self.measurementModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Measurement items ');
                }
            }
		});
	}

	 _self.beginEditedMeasurementModel = function (model, formlink) {
        _self.editedMeasurementModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateMeasurementModel = function (formlink) {
        _self.candidateMeasurementModel(dummyMeasurementModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveMeasurementModel = function (model, formlink) {
        _self.removedMeasurementModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedMeasurementModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/MeasurementApi?Id=' + _self.editedMeasurementModel().Id(), {
            data: ko.toJSON(_self.editedMeasurementModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.measurementModels().length; i++) {
                    if (_self.measurementModels()[i].Id() == _self.editedMeasurementModel().Id()) {

                        _self.measurementModels.replace(_self.measurementModels()[i], _self.editedMeasurementModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedMeasurementModel().Id());
                }

                console.log('Success edited Measurement item ' + _self.editedMeasurementModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedMeasurementModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateMeasurementModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/MeasurementApi', {
            data: ko.toJSON(_self.candidateMeasurementModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Measurement model');
                addedModel = JSON.parse(result.responseText);
				_self.addedMeasurementModel().Id(addedModel.Id);
				_self.addedMeasurementModel().MeasurementTypeId(addedModel.MeasurementTypeId);
				_self.addedMeasurementModel().Title(addedModel.Title);
				_self.addedMeasurementModel().MeasurementDate(addedModel.MeasurementDate);
				_self.addedMeasurementModel().CreateDate(addedModel.CreateDate);
				_self.addedMeasurementModel().LastUpdateDate(addedModel.LastUpdateDate);
				_self.addedMeasurementModel().UserId(addedModel.UserId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Measurement item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Measurement model.');
            }
        });
    }

	 _self.commitRemovedMeasurementModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedMeasurementModel().Id)) {
            id = _self.removedMeasurementModel().Id();
        } else {
            id = _self.removedMeasurementModel().Id;
        }

        $.ajax('/api/Liveo.Platform/MeasurementApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.measurementModels.remove(_self.removedMeasurementModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Measurement item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Measurement item ' + id + '.');
            }
        });
    }
   
    _self.saveMeasurementAll = function () {
        var jsonData = ko.toJSON(_self.measurementModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

