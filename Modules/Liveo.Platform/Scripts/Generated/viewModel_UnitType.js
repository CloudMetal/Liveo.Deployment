
function UnitTypeModel(
            id,
            shortName,
            longName) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.ShortName = ko.observable(shortName);
	_self.LongName = ko.observable(longName);

}

function UnitType_ViewModel() {
    //#region member vars
    testVariable_UnitType = 'UnitType viewmodel bound';

    var _self = this;

    var dummyUnitTypeModel = new UnitTypeModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUnitTypeModel = new ko.observable(dummyUnitTypeModel);
    _self.editedUnitTypeModel = ko.observable(dummyUnitTypeModel);
    _self.removedUnitTypeModel = ko.observable(dummyUnitTypeModel);
	_self.selectedUnitTypeModel = ko.observable(dummyUnitTypeModel);
	_self.candidateUnitTypeModel = ko.observable(dummyUnitTypeModel);
    _self.unitTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUnitTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UnitTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UnitTypeModel(data[i].Id, data[i].ShortName, data[i].LongName));
				}
				_self.unitTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get UnitType items ');
                }
            }
		});
	}

	 _self.beginEditedUnitTypeModel = function (model, formlink) {
        _self.editedUnitTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUnitTypeModel = function (formlink) {
        _self.candidateUnitTypeModel(dummyUnitTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUnitTypeModel = function (model, formlink) {
        _self.removedUnitTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUnitTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UnitTypeApi?Id=' + _self.editedUnitTypeModel().Id(), {
            data: ko.toJSON(_self.editedUnitTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.unitTypeModels().length; i++) {
                    if (_self.unitTypeModels()[i].Id() == _self.editedUnitTypeModel().Id()) {

                        _self.unitTypeModels.replace(_self.unitTypeModels()[i], _self.editedUnitTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUnitTypeModel().Id());
                }

                console.log('Success edited UnitType item ' + _self.editedUnitTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUnitTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUnitTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UnitTypeApi', {
            data: ko.toJSON(_self.candidateUnitTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new UnitType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUnitTypeModel().Id(addedModel.Id);
				_self.addedUnitTypeModel().ShortName(addedModel.ShortName);
				_self.addedUnitTypeModel().LongName(addedModel.LongName);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added UnitType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new UnitType model.');
            }
        });
    }

	 _self.commitRemovedUnitTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUnitTypeModel().Id)) {
            id = _self.removedUnitTypeModel().Id();
        } else {
            id = _self.removedUnitTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UnitTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.unitTypeModels.remove(_self.removedUnitTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed UnitType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove UnitType item ' + id + '.');
            }
        });
    }
   
    _self.saveUnitTypeAll = function () {
        var jsonData = ko.toJSON(_self.unitTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

