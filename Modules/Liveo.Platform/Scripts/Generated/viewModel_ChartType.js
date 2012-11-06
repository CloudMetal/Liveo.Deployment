
function ChartTypeModel(
            id,
            name) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);

}

function ChartType_ViewModel() {
    //#region member vars
    testVariable_ChartType = 'ChartType viewmodel bound';

    var _self = this;

    var dummyChartTypeModel = new ChartTypeModel(0,0);
    var obsModels = new Array();
    var data;
    _self.addedChartTypeModel = new ko.observable(dummyChartTypeModel);
    _self.editedChartTypeModel = ko.observable(dummyChartTypeModel);
    _self.removedChartTypeModel = ko.observable(dummyChartTypeModel);
	_self.selectedChartTypeModel = ko.observable(dummyChartTypeModel);
	_self.candidateChartTypeModel = ko.observable(dummyChartTypeModel);
    _self.chartTypeModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllChartTypeModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ChartTypeApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ChartTypeModel(data[i].Id, data[i].Name));
				}
				_self.chartTypeModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get ChartType items ');
                }
            }
		});
	}

	 _self.beginEditedChartTypeModel = function (model, formlink) {
        _self.editedChartTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateChartTypeModel = function (formlink) {
        _self.candidateChartTypeModel(dummyChartTypeModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveChartTypeModel = function (model, formlink) {
        _self.removedChartTypeModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedChartTypeModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ChartTypeApi?Id=' + _self.editedChartTypeModel().Id(), {
            data: ko.toJSON(_self.editedChartTypeModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.chartTypeModels().length; i++) {
                    if (_self.chartTypeModels()[i].Id() == _self.editedChartTypeModel().Id()) {

                        _self.chartTypeModels.replace(_self.chartTypeModels()[i], _self.editedChartTypeModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedChartTypeModel().Id());
                }

                console.log('Success edited ChartType item ' + _self.editedChartTypeModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedChartTypeModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateChartTypeModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ChartTypeApi', {
            data: ko.toJSON(_self.candidateChartTypeModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new ChartType model');
                addedModel = JSON.parse(result.responseText);
				_self.addedChartTypeModel().Id(addedModel.Id);
				_self.addedChartTypeModel().Name(addedModel.Name);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added ChartType item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new ChartType model.');
            }
        });
    }

	 _self.commitRemovedChartTypeModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedChartTypeModel().Id)) {
            id = _self.removedChartTypeModel().Id();
        } else {
            id = _self.removedChartTypeModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ChartTypeApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.chartTypeModels.remove(_self.removedChartTypeModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed ChartType item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove ChartType item ' + id + '.');
            }
        });
    }
   
    _self.saveChartTypeAll = function () {
        var jsonData = ko.toJSON(_self.chartTypeModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

