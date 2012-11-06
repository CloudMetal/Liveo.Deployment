
function AlbumModel(
            id,
            name,
            userId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.UserId = ko.observable(userId);

}

function Album_ViewModel() {
    //#region member vars
    testVariable_Album = 'Album viewmodel bound';

    var _self = this;

    var dummyAlbumModel = new AlbumModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedAlbumModel = new ko.observable(dummyAlbumModel);
    _self.editedAlbumModel = ko.observable(dummyAlbumModel);
    _self.removedAlbumModel = ko.observable(dummyAlbumModel);
	_self.selectedAlbumModel = ko.observable(dummyAlbumModel);
	_self.candidateAlbumModel = ko.observable(dummyAlbumModel);
    _self.albumModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllAlbumModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/AlbumApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new AlbumModel(data[i].Id, data[i].Name, data[i].UserId));
				}
				_self.albumModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Album items ');
                }
            }
		});
	}

	 _self.beginEditedAlbumModel = function (model, formlink) {
        _self.editedAlbumModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateAlbumModel = function (formlink) {
        _self.candidateAlbumModel(dummyAlbumModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveAlbumModel = function (model, formlink) {
        _self.removedAlbumModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedAlbumModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/AlbumApi?Id=' + _self.editedAlbumModel().Id(), {
            data: ko.toJSON(_self.editedAlbumModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.albumModels().length; i++) {
                    if (_self.albumModels()[i].Id() == _self.editedAlbumModel().Id()) {

                        _self.albumModels.replace(_self.albumModels()[i], _self.editedAlbumModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedAlbumModel().Id());
                }

                console.log('Success edited Album item ' + _self.editedAlbumModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedAlbumModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateAlbumModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/AlbumApi', {
            data: ko.toJSON(_self.candidateAlbumModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Album model');
                addedModel = JSON.parse(result.responseText);
				_self.addedAlbumModel().Id(addedModel.Id);
				_self.addedAlbumModel().Name(addedModel.Name);
				_self.addedAlbumModel().UserId(addedModel.UserId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Album item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Album model.');
            }
        });
    }

	 _self.commitRemovedAlbumModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedAlbumModel().Id)) {
            id = _self.removedAlbumModel().Id();
        } else {
            id = _self.removedAlbumModel().Id;
        }

        $.ajax('/api/Liveo.Platform/AlbumApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.albumModels.remove(_self.removedAlbumModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Album item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Album item ' + id + '.');
            }
        });
    }
   
    _self.saveAlbumAll = function () {
        var jsonData = ko.toJSON(_self.albumModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

