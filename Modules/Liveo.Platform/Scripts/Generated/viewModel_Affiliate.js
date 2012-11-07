
function AffiliateModel(
            id,
            name,
            pictureUrl,
            promotionCode) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.PictureUrl = ko.observable(pictureUrl);
	_self.PromotionCode = ko.observable(promotionCode);

}

function Affiliate_ViewModel() {
    //#region member vars
    testVariable_Affiliate = 'Affiliate viewmodel bound';

    var _self = this;

    var dummyAffiliateModel = new AffiliateModel(0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedAffiliateModel = new ko.observable(dummyAffiliateModel);
    _self.editedAffiliateModel = ko.observable(dummyAffiliateModel);
    _self.removedAffiliateModel = ko.observable(dummyAffiliateModel);
	_self.selectedAffiliateModel = ko.observable(dummyAffiliateModel);
	_self.candidateAffiliateModel = ko.observable(dummyAffiliateModel);
    _self.affiliateModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllAffiliateModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/AffiliateApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new AffiliateModel(data[i].Id, data[i].Name, data[i].PictureUrl, data[i].PromotionCode));
				}
				_self.affiliateModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get Affiliate items ');
                }
            }
		});
	}

	 _self.beginEditedAffiliateModel = function (model, formlink) {
        _self.editedAffiliateModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateAffiliateModel = function (formlink) {
        _self.candidateAffiliateModel(dummyAffiliateModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveAffiliateModel = function (model, formlink) {
        _self.removedAffiliateModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedAffiliateModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/AffiliateApi?Id=' + _self.editedAffiliateModel().Id(), {
            data: ko.toJSON(_self.editedAffiliateModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.affiliateModels().length; i++) {
                    if (_self.affiliateModels()[i].Id() == _self.editedAffiliateModel().Id()) {

                        _self.affiliateModels.replace(_self.affiliateModels()[i], _self.editedAffiliateModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedAffiliateModel().Id());
                }

                console.log('Success edited Affiliate item ' + _self.editedAffiliateModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedAffiliateModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateAffiliateModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/AffiliateApi', {
            data: ko.toJSON(_self.candidateAffiliateModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new Affiliate model');
                addedModel = JSON.parse(result.responseText);
				_self.addedAffiliateModel().Id(addedModel.Id);
				_self.addedAffiliateModel().Name(addedModel.Name);
				_self.addedAffiliateModel().PictureUrl(addedModel.PictureUrl);
				_self.addedAffiliateModel().PromotionCode(addedModel.PromotionCode);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added Affiliate item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new Affiliate model.');
            }
        });
    }

	 _self.commitRemovedAffiliateModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedAffiliateModel().Id)) {
            id = _self.removedAffiliateModel().Id();
        } else {
            id = _self.removedAffiliateModel().Id;
        }

        $.ajax('/api/Liveo.Platform/AffiliateApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.affiliateModels.remove(_self.removedAffiliateModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed Affiliate item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove Affiliate item ' + id + '.');
            }
        });
    }
   
    _self.saveAffiliateAll = function () {
        var jsonData = ko.toJSON(_self.affiliateModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

