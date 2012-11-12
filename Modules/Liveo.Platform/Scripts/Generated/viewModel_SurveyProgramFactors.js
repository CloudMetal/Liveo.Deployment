
function SurveyProgramFactorsModel(
            id,
            surveyId,
            programId,
            factor) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.SurveyId = ko.observable(surveyId);
	_self.ProgramId = ko.observable(programId);
	_self.Factor = ko.observable(factor);

}

function SurveyProgramFactors_ViewModel() {
    //#region member vars
    testVariable_SurveyProgramFactors = 'SurveyProgramFactors viewmodel bound';

    var _self = this;

    var dummySurveyProgramFactorsModel = new SurveyProgramFactorsModel(0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedSurveyProgramFactorsModel = new ko.observable(dummySurveyProgramFactorsModel);
    _self.editedSurveyProgramFactorsModel = ko.observable(dummySurveyProgramFactorsModel);
    _self.removedSurveyProgramFactorsModel = ko.observable(dummySurveyProgramFactorsModel);
	_self.selectedSurveyProgramFactorsModel = ko.observable(dummySurveyProgramFactorsModel);
	_self.candidateSurveyProgramFactorsModel = ko.observable(dummySurveyProgramFactorsModel);
    _self.surveyProgramFactorsModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllSurveyProgramFactorsModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/SurveyProgramFactorsApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new SurveyProgramFactorsModel(data[i].Id, data[i].SurveyId, data[i].ProgramId, data[i].Factor));
				}
				_self.surveyProgramFactorsModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get SurveyProgramFactors items ');
                }
            }
		});
	}

	 _self.beginEditedSurveyProgramFactorsModel = function (model, formlink) {
        _self.editedSurveyProgramFactorsModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateSurveyProgramFactorsModel = function (formlink) {
        _self.candidateSurveyProgramFactorsModel(dummySurveyProgramFactorsModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveSurveyProgramFactorsModel = function (model, formlink) {
        _self.removedSurveyProgramFactorsModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedSurveyProgramFactorsModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/SurveyProgramFactorsApi?Id=' + _self.editedSurveyProgramFactorsModel().Id(), {
            data: ko.toJSON(_self.editedSurveyProgramFactorsModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.surveyProgramFactorsModels().length; i++) {
                    if (_self.surveyProgramFactorsModels()[i].Id() == _self.editedSurveyProgramFactorsModel().Id()) {

                        _self.surveyProgramFactorsModels.replace(_self.surveyProgramFactorsModels()[i], _self.editedSurveyProgramFactorsModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedSurveyProgramFactorsModel().Id());
                }

                console.log('Success edited SurveyProgramFactors item ' + _self.editedSurveyProgramFactorsModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedSurveyProgramFactorsModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateSurveyProgramFactorsModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/SurveyProgramFactorsApi', {
            data: ko.toJSON(_self.candidateSurveyProgramFactorsModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new SurveyProgramFactors model');
                addedModel = JSON.parse(result.responseText);
				_self.addedSurveyProgramFactorsModel().Id(addedModel.Id);
				_self.addedSurveyProgramFactorsModel().SurveyId(addedModel.SurveyId);
				_self.addedSurveyProgramFactorsModel().ProgramId(addedModel.ProgramId);
				_self.addedSurveyProgramFactorsModel().Factor(addedModel.Factor);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added SurveyProgramFactors item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new SurveyProgramFactors model.');
            }
        });
    }

	 _self.commitRemovedSurveyProgramFactorsModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedSurveyProgramFactorsModel().Id)) {
            id = _self.removedSurveyProgramFactorsModel().Id();
        } else {
            id = _self.removedSurveyProgramFactorsModel().Id;
        }

        $.ajax('/api/Liveo.Platform/SurveyProgramFactorsApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.surveyProgramFactorsModels.remove(_self.removedSurveyProgramFactorsModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed SurveyProgramFactors item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove SurveyProgramFactors item ' + id + '.');
            }
        });
    }
   
    _self.saveSurveyProgramFactorsAll = function () {
        var jsonData = ko.toJSON(_self.surveyProgramFactorsModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

