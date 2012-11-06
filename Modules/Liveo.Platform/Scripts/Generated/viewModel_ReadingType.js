
function ReadingTypeModel(
            id,
            name,
            unitTypeId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.UnitTypeId = ko.observable(unitTypeId);

}

function ReadingType_ViewModel() {
    //#region member vars
    testVariable_ReadingType = 'ReadingType viewmodel bound';

    var _self = this;

    var dummyReadingTypeModel = new ReadingTypeModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedReadingTypeModel = new ko.observable(dummyReadingTypeModel);
    _self.editedReadingTypeModel = ko.observable(dummyReadingTypeModel);
    _self.removedReadingTypeModel = ko.observable(dummyReadingTypeModel);
	_self.selectedReadingTypeModel = ko.observable(dummyReadingTypeModel);
	_self.candidateReadingTypeModel = ko.observable(dummyReadingTypeModel);
    _self.readingTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllReadingTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ReadingTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ReadingTypeModel(data[i].Id, data[i].Name, data[i].UnitTypeId));
				}
				_self.readingTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get ReadingType items ');
                }
            }
		});
	}

	 _self.beginEditedReadingTypeModel = function (model, formlink) {
        _self.editedReadingTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateReadingTypeModel = function (formlink) {
        _self.candidateReadingTypeModel(dummyReadingTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveReadingTypeModel = function (model, formlink) {
        _self.removedReadingTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedReadingTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ReadingTypeApi?Id=' + _self.editedReadingTypeModel().Id(), {
            data: ko.toJSON(_self.editedReadingTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.readingTypeModels().length; i++) {
                    if (_self.readingTypeModels()[i].Id() == _self.editedReadingTypeModel().Id()) {

                        _self.readingTypeModels.replace(_self.readingTypeModels()[i], _self.editedReadingTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedReadingTypeModel().Id());
                }

                console.log('Success edited ReadingType item ' + _self.editedReadingTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedReadingTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateReadingTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ReadingTypeApi', {
            data: ko.toJSON(_self.candidateReadingTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new ReadingType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedReadingTypeModel().Id(addedModel.Id);
				_self.addedReadingTypeModel().Name(addedModel.Name);
				_self.addedReadingTypeModel().UnitTypeId(addedModel.UnitTypeId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added ReadingType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new ReadingType model.');
            }
        });
    }

	 _self.commitRemovedReadingTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedReadingTypeModel().Id)) {
            id = _self.removedReadingTypeModel().Id();
        } else {
            id = _self.removedReadingTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ReadingTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.readingTypeModels.remove(_self.removedReadingTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed ReadingType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove ReadingType item ' + id + '.');
            }
        });
    }
   
    _self.saveReadingTypeAll = function () {
        var jsonData = ko.toJSON(_self.readingTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

