
function AnswerSelectionFactorsModel(
            id,
            answerSelectionId,
            muliplier) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.AnswerSelectionId = ko.observable(answerSelectionId);
	_self.Muliplier = ko.observable(muliplier);

}

function AnswerSelectionFactors_ViewModel() {
    //#region member vars
    testVariable_AnswerSelectionFactors = 'AnswerSelectionFactors viewmodel bound';

    var _self = this;

    var dummyAnswerSelectionFactorsModel = new AnswerSelectionFactorsModel(0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedAnswerSelectionFactorsModel = new ko.observable(dummyAnswerSelectionFactorsModel);
    _self.editedAnswerSelectionFactorsModel = ko.observable(dummyAnswerSelectionFactorsModel);
    _self.removedAnswerSelectionFactorsModel = ko.observable(dummyAnswerSelectionFactorsModel);
	_self.selectedAnswerSelectionFactorsModel = ko.observable(dummyAnswerSelectionFactorsModel);
	_self.candidateAnswerSelectionFactorsModel = ko.observable(dummyAnswerSelectionFactorsModel);
    _self.answerSelectionFactorsModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllAnswerSelectionFactorsModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/AnswerSelectionFactorsApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new AnswerSelectionFactorsModel(data[i].Id, data[i].AnswerSelectionId, data[i].Muliplier));
				}
				_self.answerSelectionFactorsModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get AnswerSelectionFactors items ');
                }
            }
		});
	}

	 _self.beginEditedAnswerSelectionFactorsModel = function (model, formlink) {
        _self.editedAnswerSelectionFactorsModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateAnswerSelectionFactorsModel = function (formlink) {
        _self.candidateAnswerSelectionFactorsModel(dummyAnswerSelectionFactorsModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveAnswerSelectionFactorsModel = function (model, formlink) {
        _self.removedAnswerSelectionFactorsModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedAnswerSelectionFactorsModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/AnswerSelectionFactorsApi?Id=' + _self.editedAnswerSelectionFactorsModel().Id(), {
            data: ko.toJSON(_self.editedAnswerSelectionFactorsModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.answerSelectionFactorsModels().length; i++) {
                    if (_self.answerSelectionFactorsModels()[i].Id() == _self.editedAnswerSelectionFactorsModel().Id()) {

                        _self.answerSelectionFactorsModels.replace(_self.answerSelectionFactorsModels()[i], _self.editedAnswerSelectionFactorsModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedAnswerSelectionFactorsModel().Id());
                }

                console.log('Success edited AnswerSelectionFactors item ' + _self.editedAnswerSelectionFactorsModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedAnswerSelectionFactorsModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateAnswerSelectionFactorsModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/AnswerSelectionFactorsApi', {
            data: ko.toJSON(_self.candidateAnswerSelectionFactorsModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new AnswerSelectionFactors model');
                addedModel = JSON.parse(result.responseText);
				_self.addedAnswerSelectionFactorsModel().Id(addedModel.Id);
				_self.addedAnswerSelectionFactorsModel().AnswerSelectionId(addedModel.AnswerSelectionId);
				_self.addedAnswerSelectionFactorsModel().Muliplier(addedModel.Muliplier);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added AnswerSelectionFactors item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new AnswerSelectionFactors model.');
            }
        });
    }

	 _self.commitRemovedAnswerSelectionFactorsModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedAnswerSelectionFactorsModel().Id)) {
            id = _self.removedAnswerSelectionFactorsModel().Id();
        } else {
            id = _self.removedAnswerSelectionFactorsModel().Id;
        }

        $.ajax('/api/Liveo.Platform/AnswerSelectionFactorsApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.answerSelectionFactorsModels.remove(_self.removedAnswerSelectionFactorsModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed AnswerSelectionFactors item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove AnswerSelectionFactors item ' + id + '.');
            }
        });
    }
   
    _self.saveAnswerSelectionFactorsAll = function () {
        var jsonData = ko.toJSON(_self.answerSelectionFactorsModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

