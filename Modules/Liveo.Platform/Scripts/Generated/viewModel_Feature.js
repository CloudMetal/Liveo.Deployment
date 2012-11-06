
function FeatureModel(
            id,
            name,
            relativeUrl) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.RelativeUrl = ko.observable(relativeUrl);

}

function Feature_ViewModel() {
    //#region member vars
    testVariable_Feature = 'Feature viewmodel bound';

    var _self = this;

    var dummyFeatureModel = new FeatureModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedFeatureModel = new ko.observable(dummyFeatureModel);
    _self.editedFeatureModel = ko.observable(dummyFeatureModel);
    _self.removedFeatureModel = ko.observable(dummyFeatureModel);
	_self.selectedFeatureModel = ko.observable(dummyFeatureModel);
	_self.candidateFeatureModel = ko.observable(dummyFeatureModel);
    _self.featureModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllFeatureModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/FeatureApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new FeatureModel(data[i].Id, data[i].Name, data[i].RelativeUrl));
				}
				_self.featureModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Feature items ');
                }
            }
		});
	}

	 _self.beginEditedFeatureModel = function (model, formlink) {
        _self.editedFeatureModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateFeatureModel = function (formlink) {
        _self.candidateFeatureModel(dummyFeatureModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveFeatureModel = function (model, formlink) {
        _self.removedFeatureModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedFeatureModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/FeatureApi?Id=' + _self.editedFeatureModel().Id(), {
            data: ko.toJSON(_self.editedFeatureModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.featureModels().length; i++) {
                    if (_self.featureModels()[i].Id() == _self.editedFeatureModel().Id()) {

                        _self.featureModels.replace(_self.featureModels()[i], _self.editedFeatureModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedFeatureModel().Id());
                }

                console.log('Success edited Feature item ' + _self.editedFeatureModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedFeatureModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateFeatureModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/FeatureApi', {
            data: ko.toJSON(_self.candidateFeatureModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Feature model');
                addedModel = JSON.parse(result.responseText);
				_self.addedFeatureModel().Id(addedModel.Id);
				_self.addedFeatureModel().Name(addedModel.Name);
				_self.addedFeatureModel().RelativeUrl(addedModel.RelativeUrl);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Feature item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Feature model.');
            }
        });
    }

	 _self.commitRemovedFeatureModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedFeatureModel().Id)) {
            id = _self.removedFeatureModel().Id();
        } else {
            id = _self.removedFeatureModel().Id;
        }

        $.ajax('/api/Liveo.Platform/FeatureApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.featureModels.remove(_self.removedFeatureModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Feature item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Feature item ' + id + '.');
            }
        });
    }
   
    _self.saveFeatureAll = function () {
        var jsonData = ko.toJSON(_self.featureModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

