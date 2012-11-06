
function ReadingModel(
            id,
            measurementId,
            units,
            createDate,
            measurementDate,
            lastUpdateDate,
            readingTypeId,
            readingSourceId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.MeasurementId = ko.observable(measurementId);
	_self.Units = ko.observable(units);
	_self.CreateDate = ko.observable(createDate);
	_self.MeasurementDate = ko.observable(measurementDate);
	_self.LastUpdateDate = ko.observable(lastUpdateDate);
	_self.ReadingTypeId = ko.observable(readingTypeId);
	_self.ReadingSourceId = ko.observable(readingSourceId);

}

function Reading_ViewModel() {
    //#region member vars
    testVariable_Reading = 'Reading viewmodel bound';

    var _self = this;

    var dummyReadingModel = new ReadingModel(0,0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedReadingModel = new ko.observable(dummyReadingModel);
    _self.editedReadingModel = ko.observable(dummyReadingModel);
    _self.removedReadingModel = ko.observable(dummyReadingModel);
	_self.selectedReadingModel = ko.observable(dummyReadingModel);
	_self.candidateReadingModel = ko.observable(dummyReadingModel);
    _self.readingModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllReadingModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ReadingApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ReadingModel(data[i].Id, data[i].MeasurementId, data[i].Units, data[i].CreateDate, data[i].MeasurementDate, data[i].LastUpdateDate, data[i].ReadingTypeId, data[i].ReadingSourceId));
				}
				_self.readingModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Reading items ');
                }
            }
		});
	}

	 _self.beginEditedReadingModel = function (model, formlink) {
        _self.editedReadingModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateReadingModel = function (formlink) {
        _self.candidateReadingModel(dummyReadingModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveReadingModel = function (model, formlink) {
        _self.removedReadingModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedReadingModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ReadingApi?Id=' + _self.editedReadingModel().Id(), {
            data: ko.toJSON(_self.editedReadingModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.readingModels().length; i++) {
                    if (_self.readingModels()[i].Id() == _self.editedReadingModel().Id()) {

                        _self.readingModels.replace(_self.readingModels()[i], _self.editedReadingModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedReadingModel().Id());
                }

                console.log('Success edited Reading item ' + _self.editedReadingModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedReadingModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateReadingModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ReadingApi', {
            data: ko.toJSON(_self.candidateReadingModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Reading model');
                addedModel = JSON.parse(result.responseText);
				_self.addedReadingModel().Id(addedModel.Id);
				_self.addedReadingModel().MeasurementId(addedModel.MeasurementId);
				_self.addedReadingModel().Units(addedModel.Units);
				_self.addedReadingModel().CreateDate(addedModel.CreateDate);
				_self.addedReadingModel().MeasurementDate(addedModel.MeasurementDate);
				_self.addedReadingModel().LastUpdateDate(addedModel.LastUpdateDate);
				_self.addedReadingModel().ReadingTypeId(addedModel.ReadingTypeId);
				_self.addedReadingModel().ReadingSourceId(addedModel.ReadingSourceId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Reading item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Reading model.');
            }
        });
    }

	 _self.commitRemovedReadingModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedReadingModel().Id)) {
            id = _self.removedReadingModel().Id();
        } else {
            id = _self.removedReadingModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ReadingApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.readingModels.remove(_self.removedReadingModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Reading item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Reading item ' + id + '.');
            }
        });
    }
   
    _self.saveReadingAll = function () {
        var jsonData = ko.toJSON(_self.readingModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

