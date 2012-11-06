
function SurveyModel(
            id,
            name,
            description,
            htmlContent,
            createDate,
            minorVersion,
            majorVersion) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.Description = ko.observable(description);
	_self.HtmlContent = ko.observable(htmlContent);
	_self.CreateDate = ko.observable(createDate);
	_self.MinorVersion = ko.observable(minorVersion);
	_self.MajorVersion = ko.observable(majorVersion);

}

function Survey_ViewModel() {
    //#region member vars
    testVariable_Survey = 'Survey viewmodel bound';

    var _self = this;

    var dummySurveyModel = new SurveyModel(0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedSurveyModel = new ko.observable(dummySurveyModel);
    _self.editedSurveyModel = ko.observable(dummySurveyModel);
    _self.removedSurveyModel = ko.observable(dummySurveyModel);
	_self.selectedSurveyModel = ko.observable(dummySurveyModel);
	_self.candidateSurveyModel = ko.observable(dummySurveyModel);
    _self.surveyModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllSurveyModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/SurveyApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new SurveyModel(data[i].Id, data[i].Name, data[i].Description, data[i].HtmlContent, data[i].CreateDate, data[i].MinorVersion, data[i].MajorVersion));
				}
				_self.surveyModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Survey items ');
                }
            }
		});
	}

	 _self.beginEditedSurveyModel = function (model, formlink) {
        _self.editedSurveyModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateSurveyModel = function (formlink) {
        _self.candidateSurveyModel(dummySurveyModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveSurveyModel = function (model, formlink) {
        _self.removedSurveyModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedSurveyModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/SurveyApi?Id=' + _self.editedSurveyModel().Id(), {
            data: ko.toJSON(_self.editedSurveyModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.surveyModels().length; i++) {
                    if (_self.surveyModels()[i].Id() == _self.editedSurveyModel().Id()) {

                        _self.surveyModels.replace(_self.surveyModels()[i], _self.editedSurveyModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedSurveyModel().Id());
                }

                console.log('Success edited Survey item ' + _self.editedSurveyModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedSurveyModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateSurveyModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/SurveyApi', {
            data: ko.toJSON(_self.candidateSurveyModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Survey model');
                addedModel = JSON.parse(result.responseText);
				_self.addedSurveyModel().Id(addedModel.Id);
				_self.addedSurveyModel().Name(addedModel.Name);
				_self.addedSurveyModel().Description(addedModel.Description);
				_self.addedSurveyModel().HtmlContent(addedModel.HtmlContent);
				_self.addedSurveyModel().CreateDate(addedModel.CreateDate);
				_self.addedSurveyModel().MinorVersion(addedModel.MinorVersion);
				_self.addedSurveyModel().MajorVersion(addedModel.MajorVersion);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Survey item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Survey model.');
            }
        });
    }

	 _self.commitRemovedSurveyModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedSurveyModel().Id)) {
            id = _self.removedSurveyModel().Id();
        } else {
            id = _self.removedSurveyModel().Id;
        }

        $.ajax('/api/Liveo.Platform/SurveyApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.surveyModels.remove(_self.removedSurveyModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Survey item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Survey item ' + id + '.');
            }
        });
    }
   
    _self.saveSurveyAll = function () {
        var jsonData = ko.toJSON(_self.surveyModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

