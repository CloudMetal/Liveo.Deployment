
function OrganizationModel(
            id,
            name,
            address1,
            address2,
            city,
            state,
            zip,
            phone) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.Address1 = ko.observable(address1);
	_self.Address2 = ko.observable(address2);
	_self.City = ko.observable(city);
	_self.State = ko.observable(state);
	_self.Zip = ko.observable(zip);
	_self.Phone = ko.observable(phone);

}

function Organization_ViewModel() {
    //#region member vars
    testVariable_Organization = 'Organization viewmodel bound';

    var _self = this;

    var dummyOrganizationModel = new OrganizationModel(0,0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedOrganizationModel = new ko.observable(dummyOrganizationModel);
    _self.editedOrganizationModel = ko.observable(dummyOrganizationModel);
    _self.removedOrganizationModel = ko.observable(dummyOrganizationModel);
	_self.selectedOrganizationModel = ko.observable(dummyOrganizationModel);
	_self.candidateOrganizationModel = ko.observable(dummyOrganizationModel);
    _self.organizationModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllOrganizationModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/OrganizationApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new OrganizationModel(data[i].Id, data[i].Name, data[i].Address1, data[i].Address2, data[i].City, data[i].State, data[i].Zip, data[i].Phone));
				}
				_self.organizationModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Organization items ');
                }
            }
		});
	}

	 _self.beginEditedOrganizationModel = function (model, formlink) {
        _self.editedOrganizationModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateOrganizationModel = function (formlink) {
        _self.candidateOrganizationModel(dummyOrganizationModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveOrganizationModel = function (model, formlink) {
        _self.removedOrganizationModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedOrganizationModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/OrganizationApi?Id=' + _self.editedOrganizationModel().Id(), {
            data: ko.toJSON(_self.editedOrganizationModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.organizationModels().length; i++) {
                    if (_self.organizationModels()[i].Id() == _self.editedOrganizationModel().Id()) {

                        _self.organizationModels.replace(_self.organizationModels()[i], _self.editedOrganizationModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedOrganizationModel().Id());
                }

                console.log('Success edited Organization item ' + _self.editedOrganizationModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedOrganizationModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateOrganizationModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/OrganizationApi', {
            data: ko.toJSON(_self.candidateOrganizationModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Organization model');
                addedModel = JSON.parse(result.responseText);
				_self.addedOrganizationModel().Id(addedModel.Id);
				_self.addedOrganizationModel().Name(addedModel.Name);
				_self.addedOrganizationModel().Address1(addedModel.Address1);
				_self.addedOrganizationModel().Address2(addedModel.Address2);
				_self.addedOrganizationModel().City(addedModel.City);
				_self.addedOrganizationModel().State(addedModel.State);
				_self.addedOrganizationModel().Zip(addedModel.Zip);
				_self.addedOrganizationModel().Phone(addedModel.Phone);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Organization item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Organization model.');
            }
        });
    }

	 _self.commitRemovedOrganizationModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedOrganizationModel().Id)) {
            id = _self.removedOrganizationModel().Id();
        } else {
            id = _self.removedOrganizationModel().Id;
        }

        $.ajax('/api/Liveo.Platform/OrganizationApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.organizationModels.remove(_self.removedOrganizationModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Organization item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Organization item ' + id + '.');
            }
        });
    }
   
    _self.saveOrganizationAll = function () {
        var jsonData = ko.toJSON(_self.organizationModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

