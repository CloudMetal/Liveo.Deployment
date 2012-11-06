
function ReadingTypeUnitTypeXModel(
            id,
            readingTypeId,
            unitTypeId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.ReadingTypeId = ko.observable(readingTypeId);
	_self.UnitTypeId = ko.observable(unitTypeId);

}

function ReadingTypeUnitTypeX_ViewModel() {
    //#region member vars
    testVariable_ReadingTypeUnitTypeX = 'ReadingTypeUnitTypeX viewmodel bound';

    var _self = this;

    var dummyReadingTypeUnitTypeXModel = new ReadingTypeUnitTypeXModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedReadingTypeUnitTypeXModel = new ko.observable(dummyReadingTypeUnitTypeXModel);
    _self.editedReadingTypeUnitTypeXModel = ko.observable(dummyReadingTypeUnitTypeXModel);
    _self.removedReadingTypeUnitTypeXModel = ko.observable(dummyReadingTypeUnitTypeXModel);
	_self.selectedReadingTypeUnitTypeXModel = ko.observable(dummyReadingTypeUnitTypeXModel);
	_self.candidateReadingTypeUnitTypeXModel = ko.observable(dummyReadingTypeUnitTypeXModel);
    _self.readingTypeUnitTypeXModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllReadingTypeUnitTypeXModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ReadingTypeUnitTypeXApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ReadingTypeUnitTypeXModel(data[i].Id, data[i].ReadingTypeId, data[i].UnitTypeId));
				}
				_self.readingTypeUnitTypeXModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get ReadingTypeUnitTypeX items ');
                }
            }
		});
	}

	 _self.beginEditedReadingTypeUnitTypeXModel = function (model, formlink) {
        _self.editedReadingTypeUnitTypeXModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateReadingTypeUnitTypeXModel = function (formlink) {
        _self.candidateReadingTypeUnitTypeXModel(dummyReadingTypeUnitTypeXModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveReadingTypeUnitTypeXModel = function (model, formlink) {
        _self.removedReadingTypeUnitTypeXModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedReadingTypeUnitTypeXModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ReadingTypeUnitTypeXApi?Id=' + _self.editedReadingTypeUnitTypeXModel().Id(), {
            data: ko.toJSON(_self.editedReadingTypeUnitTypeXModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.readingTypeUnitTypeXModels().length; i++) {
                    if (_self.readingTypeUnitTypeXModels()[i].Id() == _self.editedReadingTypeUnitTypeXModel().Id()) {

                        _self.readingTypeUnitTypeXModels.replace(_self.readingTypeUnitTypeXModels()[i], _self.editedReadingTypeUnitTypeXModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedReadingTypeUnitTypeXModel().Id());
                }

                console.log('Success edited ReadingTypeUnitTypeX item ' + _self.editedReadingTypeUnitTypeXModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedReadingTypeUnitTypeXModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateReadingTypeUnitTypeXModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ReadingTypeUnitTypeXApi', {
            data: ko.toJSON(_self.candidateReadingTypeUnitTypeXModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new ReadingTypeUnitTypeX model');
                addedModel = JSON.parse(result.responseText);
				_self.addedReadingTypeUnitTypeXModel().Id(addedModel.Id);
				_self.addedReadingTypeUnitTypeXModel().ReadingTypeId(addedModel.ReadingTypeId);
				_self.addedReadingTypeUnitTypeXModel().UnitTypeId(addedModel.UnitTypeId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added ReadingTypeUnitTypeX item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new ReadingTypeUnitTypeX model.');
            }
        });
    }

	 _self.commitRemovedReadingTypeUnitTypeXModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedReadingTypeUnitTypeXModel().Id)) {
            id = _self.removedReadingTypeUnitTypeXModel().Id();
        } else {
            id = _self.removedReadingTypeUnitTypeXModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ReadingTypeUnitTypeXApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.readingTypeUnitTypeXModels.remove(_self.removedReadingTypeUnitTypeXModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed ReadingTypeUnitTypeX item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove ReadingTypeUnitTypeX item ' + id + '.');
            }
        });
    }
   
    _self.saveReadingTypeUnitTypeXAll = function () {
        var jsonData = ko.toJSON(_self.readingTypeUnitTypeXModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

