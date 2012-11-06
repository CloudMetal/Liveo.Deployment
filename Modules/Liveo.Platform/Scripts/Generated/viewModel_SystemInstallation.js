
function SystemInstallationModel(
            id,
            name,
            siteUrl,
            surveyId) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.SiteUrl = ko.observable(siteUrl);
	_self.SurveyId = ko.observable(surveyId);

}

function SystemInstallation_ViewModel() {
    //#region member vars
    testVariable_SystemInstallation = 'SystemInstallation viewmodel bound';

    var _self = this;

    var dummySystemInstallationModel = new SystemInstallationModel(0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedSystemInstallationModel = new ko.observable(dummySystemInstallationModel);
    _self.editedSystemInstallationModel = ko.observable(dummySystemInstallationModel);
    _self.removedSystemInstallationModel = ko.observable(dummySystemInstallationModel);
	_self.selectedSystemInstallationModel = ko.observable(dummySystemInstallationModel);
	_self.candidateSystemInstallationModel = ko.observable(dummySystemInstallationModel);
    _self.systemInstallationModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllSystemInstallationModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/SystemInstallationApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new SystemInstallationModel(data[i].Id, data[i].Name, data[i].SiteUrl, data[i].SurveyId));
				}
				_self.systemInstallationModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get SystemInstallation items ');
                }
            }
		});
	}

	 _self.beginEditedSystemInstallationModel = function (model, formlink) {
        _self.editedSystemInstallationModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateSystemInstallationModel = function (formlink) {
        _self.candidateSystemInstallationModel(dummySystemInstallationModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveSystemInstallationModel = function (model, formlink) {
        _self.removedSystemInstallationModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedSystemInstallationModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/SystemInstallationApi?Id=' + _self.editedSystemInstallationModel().Id(), {
            data: ko.toJSON(_self.editedSystemInstallationModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.systemInstallationModels().length; i++) {
                    if (_self.systemInstallationModels()[i].Id() == _self.editedSystemInstallationModel().Id()) {

                        _self.systemInstallationModels.replace(_self.systemInstallationModels()[i], _self.editedSystemInstallationModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedSystemInstallationModel().Id());
                }

                console.log('Success edited SystemInstallation item ' + _self.editedSystemInstallationModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedSystemInstallationModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateSystemInstallationModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/SystemInstallationApi', {
            data: ko.toJSON(_self.candidateSystemInstallationModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new SystemInstallation model');
                addedModel = JSON.parse(result.responseText);
				_self.addedSystemInstallationModel().Id(addedModel.Id);
				_self.addedSystemInstallationModel().Name(addedModel.Name);
				_self.addedSystemInstallationModel().SiteUrl(addedModel.SiteUrl);
				_self.addedSystemInstallationModel().SurveyId(addedModel.SurveyId);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added SystemInstallation item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new SystemInstallation model.');
            }
        });
    }

	 _self.commitRemovedSystemInstallationModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedSystemInstallationModel().Id)) {
            id = _self.removedSystemInstallationModel().Id();
        } else {
            id = _self.removedSystemInstallationModel().Id;
        }

        $.ajax('/api/Liveo.Platform/SystemInstallationApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.systemInstallationModels.remove(_self.removedSystemInstallationModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed SystemInstallation item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove SystemInstallation item ' + id + '.');
            }
        });
    }
   
    _self.saveSystemInstallationAll = function () {
        var jsonData = ko.toJSON(_self.systemInstallationModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

