
function ProgramModel(
            id,
            name,
            generalDescription,
            exerciseDescription,
            nutritionDescription,
            durationDays,
            estimatedWeightLoss,
            followingCount,
            recommendedCount,
            affiliateId,
            originatingAffiliateId,
            goalId,
            pictureUrl,
            isDeleted) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.GeneralDescription = ko.observable(generalDescription);
	_self.ExerciseDescription = ko.observable(exerciseDescription);
	_self.NutritionDescription = ko.observable(nutritionDescription);
	_self.DurationDays = ko.observable(durationDays);
	_self.EstimatedWeightLoss = ko.observable(estimatedWeightLoss);
	_self.FollowingCount = ko.observable(followingCount);
	_self.RecommendedCount = ko.observable(recommendedCount);
	_self.AffiliateId = ko.observable(affiliateId);
	_self.OriginatingAffiliateId = ko.observable(originatingAffiliateId);
	_self.GoalId = ko.observable(goalId);
	_self.PictureUrl = ko.observable(pictureUrl);
	_self.IsDeleted = ko.observable(isDeleted);

}

function Program_ViewModel() {
    //#region member vars
    testVariable_Program = 'Program viewmodel bound';

    var _self = this;

    var dummyProgramModel = new ProgramModel(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedProgramModel = new ko.observable(dummyProgramModel);
    _self.editedProgramModel = ko.observable(dummyProgramModel);
    _self.removedProgramModel = ko.observable(dummyProgramModel);
	_self.selectedProgramModel = ko.observable(dummyProgramModel);
	_self.candidateProgramModel = ko.observable(dummyProgramModel);
    _self.programModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllProgramModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/ProgramApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new ProgramModel(data[i].Id, data[i].Name, data[i].GeneralDescription, data[i].ExerciseDescription, data[i].NutritionDescription, data[i].DurationDays, data[i].EstimatedWeightLoss, data[i].FollowingCount, data[i].RecommendedCount, data[i].AffiliateId, data[i].OriginatingAffiliateId, data[i].GoalId, data[i].PictureUrl, data[i].IsDeleted));
				}
				_self.programModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Program items ');
                }
            }
		});
	}

	 _self.beginEditedProgramModel = function (model, formlink) {
        _self.editedProgramModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateProgramModel = function (formlink) {
        _self.candidateProgramModel(dummyProgramModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveProgramModel = function (model, formlink) {
        _self.removedProgramModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedProgramModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/ProgramApi?Id=' + _self.editedProgramModel().Id(), {
            data: ko.toJSON(_self.editedProgramModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.programModels().length; i++) {
                    if (_self.programModels()[i].Id() == _self.editedProgramModel().Id()) {

                        _self.programModels.replace(_self.programModels()[i], _self.editedProgramModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedProgramModel().Id());
                }

                console.log('Success edited Program item ' + _self.editedProgramModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedProgramModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateProgramModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/ProgramApi', {
            data: ko.toJSON(_self.candidateProgramModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Program model');
                addedModel = JSON.parse(result.responseText);
				_self.addedProgramModel().Id(addedModel.Id);
				_self.addedProgramModel().Name(addedModel.Name);
				_self.addedProgramModel().GeneralDescription(addedModel.GeneralDescription);
				_self.addedProgramModel().ExerciseDescription(addedModel.ExerciseDescription);
				_self.addedProgramModel().NutritionDescription(addedModel.NutritionDescription);
				_self.addedProgramModel().DurationDays(addedModel.DurationDays);
				_self.addedProgramModel().EstimatedWeightLoss(addedModel.EstimatedWeightLoss);
				_self.addedProgramModel().FollowingCount(addedModel.FollowingCount);
				_self.addedProgramModel().RecommendedCount(addedModel.RecommendedCount);
				_self.addedProgramModel().AffiliateId(addedModel.AffiliateId);
				_self.addedProgramModel().OriginatingAffiliateId(addedModel.OriginatingAffiliateId);
				_self.addedProgramModel().GoalId(addedModel.GoalId);
				_self.addedProgramModel().PictureUrl(addedModel.PictureUrl);
				_self.addedProgramModel().IsDeleted(addedModel.IsDeleted);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Program item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Program model.');
            }
        });
    }

	 _self.commitRemovedProgramModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedProgramModel().Id)) {
            id = _self.removedProgramModel().Id();
        } else {
            id = _self.removedProgramModel().Id;
        }

        $.ajax('/api/Liveo.Platform/ProgramApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.programModels.remove(_self.removedProgramModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Program item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Program item ' + id + '.');
            }
        });
    }
   
    _self.saveProgramAll = function () {
        var jsonData = ko.toJSON(_self.programModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

