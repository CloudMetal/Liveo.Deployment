
function ReadingSourceTypeModel(
            id,
            name,
            isDigital) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.IsDigital = ko.observable(isDigital);

}

function ReadingSourceType_ViewModel() {
    //#region member vars
    testVariable_ReadingSourceType = 'ReadingSourceType viewmodel bound';

    var _self = this;

    var dummyReadingSourceTypeModel = new ReadingSourceTypeModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedReadingSourceTypeModel = new ko.observable(dummyReadingSourceTypeModel);
    _self.editedReadingSourceTypeModel = ko.observable(dummyReadingSourceTypeModel);
    _self.removedReadingSourceTypeModel = ko.observable(dummyReadingSourceTypeModel);
	_self.selectedReadingSourceTypeModel = ko.observable(dummyReadingSourceTypeModel);
	_self.candidateReadingSourceTypeModel = ko.observable(dummyReadingSourceTypeModel);
    _self.readingSourceTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllReadingSourceTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ReadingSourceTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ReadingSourceTypeModel(data[i].Id, data[i].Name, data[i].IsDigital));
				}
				_self.readingSourceTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get ReadingSourceType items ');
                }
            }
		});
	}

	 _self.beginEditedReadingSourceTypeModel = function (model, formlink) {
        _self.editedReadingSourceTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateReadingSourceTypeModel = function (formlink) {
        _self.candidateReadingSourceTypeModel(dummyReadingSourceTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveReadingSourceTypeModel = function (model, formlink) {
        _self.removedReadingSourceTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedReadingSourceTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ReadingSourceTypeApi?Id=' + _self.editedReadingSourceTypeModel().Id(), {
            data: ko.toJSON(_self.editedReadingSourceTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.readingSourceTypeModels().length; i++) {
                    if (_self.readingSourceTypeModels()[i].Id() == _self.editedReadingSourceTypeModel().Id()) {

                        _self.readingSourceTypeModels.replace(_self.readingSourceTypeModels()[i], _self.editedReadingSourceTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedReadingSourceTypeModel().Id());
                }

                console.log('Success edited ReadingSourceType item ' + _self.editedReadingSourceTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedReadingSourceTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateReadingSourceTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ReadingSourceTypeApi', {
            data: ko.toJSON(_self.candidateReadingSourceTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new ReadingSourceType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedReadingSourceTypeModel().Id(addedModel.Id);
				_self.addedReadingSourceTypeModel().Name(addedModel.Name);
				_self.addedReadingSourceTypeModel().IsDigital(addedModel.IsDigital);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added ReadingSourceType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new ReadingSourceType model.');
            }
        });
    }

	 _self.commitRemovedReadingSourceTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedReadingSourceTypeModel().Id)) {
            id = _self.removedReadingSourceTypeModel().Id();
        } else {
            id = _self.removedReadingSourceTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ReadingSourceTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.readingSourceTypeModels.remove(_self.removedReadingSourceTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed ReadingSourceType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove ReadingSourceType item ' + id + '.');
            }
        });
    }
   
    _self.saveReadingSourceTypeAll = function () {
        var jsonData = ko.toJSON(_self.readingSourceTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

