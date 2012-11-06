
function PersonaModel(
            id,
            name) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);

}

function Persona_ViewModel() {
    //#region member vars
    testVariable_Persona = 'Persona viewmodel bound';

    var _self = this;

    var dummyPersonaModel = new PersonaModel(0,0);
    var obsModels = new Array();
    var data;
    _self.addedPersonaModel = new ko.observable(dummyPersonaModel);
    _self.editedPersonaModel = ko.observable(dummyPersonaModel);
    _self.removedPersonaModel = ko.observable(dummyPersonaModel);
	_self.selectedPersonaModel = ko.observable(dummyPersonaModel);
	_self.candidatePersonaModel = ko.observable(dummyPersonaModel);
    _self.personaModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllPersonaModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/PersonaApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new PersonaModel(data[i].Id, data[i].Name));
				}
				_self.personaModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Persona items ');
                }
            }
		});
	}

	 _self.beginEditedPersonaModel = function (model, formlink) {
        _self.editedPersonaModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidatePersonaModel = function (formlink) {
        _self.candidatePersonaModel(dummyPersonaModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemovePersonaModel = function (model, formlink) {
        _self.removedPersonaModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedPersonaModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/PersonaApi?Id=' + _self.editedPersonaModel().Id(), {
            data: ko.toJSON(_self.editedPersonaModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.personaModels().length; i++) {
                    if (_self.personaModels()[i].Id() == _self.editedPersonaModel().Id()) {

                        _self.personaModels.replace(_self.personaModels()[i], _self.editedPersonaModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedPersonaModel().Id());
                }

                console.log('Success edited Persona item ' + _self.editedPersonaModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedPersonaModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidatePersonaModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/PersonaApi', {
            data: ko.toJSON(_self.candidatePersonaModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Persona model');
                addedModel = JSON.parse(result.responseText);
				_self.addedPersonaModel().Id(addedModel.Id);
				_self.addedPersonaModel().Name(addedModel.Name);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Persona item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Persona model.');
            }
        });
    }

	 _self.commitRemovedPersonaModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedPersonaModel().Id)) {
            id = _self.removedPersonaModel().Id();
        } else {
            id = _self.removedPersonaModel().Id;
        }

        $.ajax('/api/Liveo.Platform/PersonaApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.personaModels.remove(_self.removedPersonaModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Persona item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Persona item ' + id + '.');
            }
        });
    }
   
    _self.savePersonaAll = function () {
        var jsonData = ko.toJSON(_self.personaModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

