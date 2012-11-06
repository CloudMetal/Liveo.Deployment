
function MediaItemModel(
            id,
            title,
            description,
            url,
            mimeType,
            albumId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Title = ko.observable(title);
	_self.Description = ko.observable(description);
	_self.Url = ko.observable(url);
	_self.MimeType = ko.observable(mimeType);
	_self.AlbumId = ko.observable(albumId);

}

function MediaItem_ViewModel() {
    //#region member vars
    testVariable_MediaItem = 'MediaItem viewmodel bound';

    var _self = this;

    var dummyMediaItemModel = new MediaItemModel(0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedMediaItemModel = new ko.observable(dummyMediaItemModel);
    _self.editedMediaItemModel = ko.observable(dummyMediaItemModel);
    _self.removedMediaItemModel = ko.observable(dummyMediaItemModel);
	_self.selectedMediaItemModel = ko.observable(dummyMediaItemModel);
	_self.candidateMediaItemModel = ko.observable(dummyMediaItemModel);
    _self.mediaItemModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllMediaItemModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/MediaItemApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new MediaItemModel(data[i].Id, data[i].Title, data[i].Description, data[i].Url, data[i].MimeType, data[i].AlbumId));
				}
				_self.mediaItemModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get MediaItem items ');
                }
            }
		});
	}

	 _self.beginEditedMediaItemModel = function (model, formlink) {
        _self.editedMediaItemModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateMediaItemModel = function (formlink) {
        _self.candidateMediaItemModel(dummyMediaItemModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveMediaItemModel = function (model, formlink) {
        _self.removedMediaItemModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedMediaItemModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/MediaItemApi?Id=' + _self.editedMediaItemModel().Id(), {
            data: ko.toJSON(_self.editedMediaItemModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.mediaItemModels().length; i++) {
                    if (_self.mediaItemModels()[i].Id() == _self.editedMediaItemModel().Id()) {

                        _self.mediaItemModels.replace(_self.mediaItemModels()[i], _self.editedMediaItemModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedMediaItemModel().Id());
                }

                console.log('Success edited MediaItem item ' + _self.editedMediaItemModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedMediaItemModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateMediaItemModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/MediaItemApi', {
            data: ko.toJSON(_self.candidateMediaItemModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new MediaItem model');
                addedModel = JSON.parse(result.responseText);
				_self.addedMediaItemModel().Id(addedModel.Id);
				_self.addedMediaItemModel().Title(addedModel.Title);
				_self.addedMediaItemModel().Description(addedModel.Description);
				_self.addedMediaItemModel().Url(addedModel.Url);
				_self.addedMediaItemModel().MimeType(addedModel.MimeType);
				_self.addedMediaItemModel().AlbumId(addedModel.AlbumId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added MediaItem item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new MediaItem model.');
            }
        });
    }

	 _self.commitRemovedMediaItemModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedMediaItemModel().Id)) {
            id = _self.removedMediaItemModel().Id();
        } else {
            id = _self.removedMediaItemModel().Id;
        }

        $.ajax('/api/Liveo.Platform/MediaItemApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.mediaItemModels.remove(_self.removedMediaItemModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed MediaItem item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove MediaItem item ' + id + '.');
            }
        });
    }
   
    _self.saveMediaItemAll = function () {
        var jsonData = ko.toJSON(_self.mediaItemModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

