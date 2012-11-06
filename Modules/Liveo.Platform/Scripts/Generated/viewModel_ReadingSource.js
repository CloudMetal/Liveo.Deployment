
function ReadingSourceModel(
            id,
            readingSourceTypeId,
            name) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.ReadingSourceTypeId = ko.observable(readingSourceTypeId);
	_self.Name = ko.observable(name);

}

function ReadingSource_ViewModel() {
    //#region member vars
    testVariable_ReadingSource = 'ReadingSource viewmodel bound';

    var _self = this;

    var dummyReadingSourceModel = new ReadingSourceModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedReadingSourceModel = new ko.observable(dummyReadingSourceModel);
    _self.editedReadingSourceModel = ko.observable(dummyReadingSourceModel);
    _self.removedReadingSourceModel = ko.observable(dummyReadingSourceModel);
	_self.selectedReadingSourceModel = ko.observable(dummyReadingSourceModel);
	_self.candidateReadingSourceModel = ko.observable(dummyReadingSourceModel);
    _self.readingSourceModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllReadingSourceModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ReadingSourceApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ReadingSourceModel(data[i].Id, data[i].ReadingSourceTypeId, data[i].Name));
				}
				_self.readingSourceModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get ReadingSource items ');
                }
            }
		});
	}

	 _self.beginEditedReadingSourceModel = function (model, formlink) {
        _self.editedReadingSourceModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateReadingSourceModel = function (formlink) {
        _self.candidateReadingSourceModel(dummyReadingSourceModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveReadingSourceModel = function (model, formlink) {
        _self.removedReadingSourceModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedReadingSourceModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ReadingSourceApi?Id=' + _self.editedReadingSourceModel().Id(), {
            data: ko.toJSON(_self.editedReadingSourceModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.readingSourceModels().length; i++) {
                    if (_self.readingSourceModels()[i].Id() == _self.editedReadingSourceModel().Id()) {

                        _self.readingSourceModels.replace(_self.readingSourceModels()[i], _self.editedReadingSourceModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedReadingSourceModel().Id());
                }

                console.log('Success edited ReadingSource item ' + _self.editedReadingSourceModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedReadingSourceModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateReadingSourceModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ReadingSourceApi', {
            data: ko.toJSON(_self.candidateReadingSourceModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new ReadingSource model');
                addedModel = JSON.parse(result.responseText);
				_self.addedReadingSourceModel().Id(addedModel.Id);
				_self.addedReadingSourceModel().ReadingSourceTypeId(addedModel.ReadingSourceTypeId);
				_self.addedReadingSourceModel().Name(addedModel.Name);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added ReadingSource item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new ReadingSource model.');
            }
        });
    }

	 _self.commitRemovedReadingSourceModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedReadingSourceModel().Id)) {
            id = _self.removedReadingSourceModel().Id();
        } else {
            id = _self.removedReadingSourceModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ReadingSourceApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.readingSourceModels.remove(_self.removedReadingSourceModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed ReadingSource item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove ReadingSource item ' + id + '.');
            }
        });
    }
   
    _self.saveReadingSourceAll = function () {
        var jsonData = ko.toJSON(_self.readingSourceModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

