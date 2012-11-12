
function UserModel(
            id,
            name,
            dateOfBirth,
            genderTypeId,
            isInitialSurveyComplete,
            userName,
            createDate,
            lastUpdateDate,
            lastLoginDate,
            lastLockoutDate,
            lastActivityDate,
            lastPasswordChangeDate,
            failedPasswordAttemptCount,
            failedPasswordAttemptWindowStart,
            failedPasswordAnswerAttemptCount,
            failedPasswordAnswerAttemptWindowStart,
            comment,
            passwordSalt,
            password,
            loweredEmail,
            email,
            passwordFormat,
            isOnline,
            isLockedOut,
            isApproved,
            passwordAnswer,
            passwordQuestion,
            promotionCode,
            bio,
            primaryImage,
            secondaryImage,
            backgroundImage,
            city,
            state,
            company,
            department,
            occupation,
            firstName,
            lastName,
            sex,
            heightFeet,
            heightInches,
            weight,
            generalHealth,
            phoneHome,
            phoneCell,
            phoneOffice,
            address,
            manageNotifications,
            notifications) {

    var _self = this;
	_self.Id = ko.observable(id);
	_self.Name = ko.observable(name);
	_self.DateOfBirth = ko.observable(dateOfBirth);
	_self.GenderTypeId = ko.observable(genderTypeId);
	_self.IsInitialSurveyComplete = ko.observable(isInitialSurveyComplete);
	_self.UserName = ko.observable(userName);
	_self.CreateDate = ko.observable(createDate);
	_self.LastUpdateDate = ko.observable(lastUpdateDate);
	_self.LastLoginDate = ko.observable(lastLoginDate);
	_self.LastLockoutDate = ko.observable(lastLockoutDate);
	_self.LastActivityDate = ko.observable(lastActivityDate);
	_self.LastPasswordChangeDate = ko.observable(lastPasswordChangeDate);
	_self.FailedPasswordAttemptCount = ko.observable(failedPasswordAttemptCount);
	_self.FailedPasswordAttemptWindowStart = ko.observable(failedPasswordAttemptWindowStart);
	_self.FailedPasswordAnswerAttemptCount = ko.observable(failedPasswordAnswerAttemptCount);
	_self.FailedPasswordAnswerAttemptWindowStart = ko.observable(failedPasswordAnswerAttemptWindowStart);
	_self.Comment = ko.observable(comment);
	_self.PasswordSalt = ko.observable(passwordSalt);
	_self.Password = ko.observable(password);
	_self.LoweredEmail = ko.observable(loweredEmail);
	_self.Email = ko.observable(email);
	_self.PasswordFormat = ko.observable(passwordFormat);
	_self.IsOnline = ko.observable(isOnline);
	_self.IsLockedOut = ko.observable(isLockedOut);
	_self.IsApproved = ko.observable(isApproved);
	_self.PasswordAnswer = ko.observable(passwordAnswer);
	_self.PasswordQuestion = ko.observable(passwordQuestion);
	_self.PromotionCode = ko.observable(promotionCode);
	_self.Bio = ko.observable(bio);
	_self.PrimaryImage = ko.observable(primaryImage);
	_self.SecondaryImage = ko.observable(secondaryImage);
	_self.BackgroundImage = ko.observable(backgroundImage);
	_self.City = ko.observable(city);
	_self.State = ko.observable(state);
	_self.Company = ko.observable(company);
	_self.Department = ko.observable(department);
	_self.Occupation = ko.observable(occupation);
	_self.FirstName = ko.observable(firstName);
	_self.LastName = ko.observable(lastName);
	_self.Sex = ko.observable(sex);
	_self.HeightFeet = ko.observable(heightFeet);
	_self.HeightInches = ko.observable(heightInches);
	_self.Weight = ko.observable(weight);
	_self.GeneralHealth = ko.observable(generalHealth);
	_self.PhoneHome = ko.observable(phoneHome);
	_self.PhoneCell = ko.observable(phoneCell);
	_self.PhoneOffice = ko.observable(phoneOffice);
	_self.Address = ko.observable(address);
	_self.ManageNotifications = ko.observable(manageNotifications);
	_self.Notifications = ko.observable(notifications);

}

function User_ViewModel() {
    //#region member vars
    testVariable_User = 'User viewmodel bound';

    var _self = this;

    var dummyUserModel = new UserModel(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    var obsModels = new Array();
    var data;
    _self.addedUserModel = new ko.observable(dummyUserModel);
    _self.editedUserModel = ko.observable(dummyUserModel);
    _self.removedUserModel = ko.observable(dummyUserModel);
	_self.selectedUserModel = ko.observable(dummyUserModel);
	_self.candidateUserModel = ko.observable(dummyUserModel);
    _self.userModels = ko.observableArray([]);
    //#endregion

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // fill models
    
	
	_self.initAllUserModels = function(callbackSuccess, callbackFail){
		$.ajax({
			url: '/api/Liveo.Platform/UserApi',
			dataType: 'json',
			success: function (data) {

				for (var i = 0; i < data.length; i++) {
					obsModels.push(new UserModel(data[i].Id, data[i].Name, data[i].DateOfBirth, data[i].GenderTypeId, data[i].IsInitialSurveyComplete, data[i].UserName, data[i].CreateDate, data[i].LastUpdateDate, data[i].LastLoginDate, data[i].LastLockoutDate, data[i].LastActivityDate, data[i].LastPasswordChangeDate, data[i].FailedPasswordAttemptCount, data[i].FailedPasswordAttemptWindowStart, data[i].FailedPasswordAnswerAttemptCount, data[i].FailedPasswordAnswerAttemptWindowStart, data[i].Comment, data[i].PasswordSalt, data[i].Password, data[i].LoweredEmail, data[i].Email, data[i].PasswordFormat, data[i].IsOnline, data[i].IsLockedOut, data[i].IsApproved, data[i].PasswordAnswer, data[i].PasswordQuestion, data[i].PromotionCode, data[i].Bio, data[i].PrimaryImage, data[i].SecondaryImage, data[i].BackgroundImage, data[i].City, data[i].State, data[i].Company, data[i].Department, data[i].Occupation, data[i].FirstName, data[i].LastName, data[i].Sex, data[i].HeightFeet, data[i].HeightInches, data[i].Weight, data[i].GeneralHealth, data[i].PhoneHome, data[i].PhoneCell, data[i].PhoneOffice, data[i].Address, data[i].ManageNotifications, data[i].Notifications));
				}
				_self.userModels(obsModels);

				if(callbackSuccess){
                    callbackSuccess(obsModels.length);
                }
			},
			error: function (xhr, textStatus, errorThrown) {
                if(callbackFail){
                    callbackFail('Failed to get User items ');
                }
            }
		});
	}

	 _self.beginEditedUserModel = function (model, formlink) {
        _self.editedUserModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginCandidateUserModel = function (formlink) {
        _self.candidateUserModel(dummyUserModel);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }
    _self.beginRemoveUserModel = function (model, formlink) {
        _self.removedUserModel(model);
        if (formlink) {
            $('[link="' + formlink + '"]').click();
        }
    }


    _self.commitEditedUserModel = function (callbackSuccess, callbackFail) {
        $.ajax('/api/Liveo.Platform/UserApi?Id=' + _self.editedUserModel().Id(), {
            data: ko.toJSON(_self.editedUserModel()), type: 'put', contentType: 'application/json', dataType: 'json',
            success: function () {

                //update the observable
                for (var i = 0; i < _self.userModels().length; i++) {
                    if (_self.userModels()[i].Id() == _self.editedUserModel().Id()) {

                        _self.userModels.replace(_self.userModels()[i], _self.editedUserModel());

                        break;
                    }
                }
                if (callbackSuccess) {
                    callbackSuccess(_self.editedUserModel().Id());
                }

                console.log('Success edited User item ' + _self.editedUserModel().Id() + '.');
            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to edit item ' + _self.editedUserModel().Id() + '.');
            }
        });
    }

	 _self.commitCandidateUserModel = function (callbackSuccess, callbackFail) {
        var addedModel;
        var result = $.ajax('/api/Liveo.Platform/UserApi', {
            data: ko.toJSON(_self.candidateUserModel()), type: 'post', contentType: 'application/json', dataType: 'json',
            success: function () {
                console.log('success add new User model');
                addedModel = JSON.parse(result.responseText);
				_self.addedUserModel().Id(addedModel.Id);
				_self.addedUserModel().Name(addedModel.Name);
				_self.addedUserModel().DateOfBirth(addedModel.DateOfBirth);
				_self.addedUserModel().GenderTypeId(addedModel.GenderTypeId);
				_self.addedUserModel().IsInitialSurveyComplete(addedModel.IsInitialSurveyComplete);
				_self.addedUserModel().UserName(addedModel.UserName);
				_self.addedUserModel().CreateDate(addedModel.CreateDate);
				_self.addedUserModel().LastUpdateDate(addedModel.LastUpdateDate);
				_self.addedUserModel().LastLoginDate(addedModel.LastLoginDate);
				_self.addedUserModel().LastLockoutDate(addedModel.LastLockoutDate);
				_self.addedUserModel().LastActivityDate(addedModel.LastActivityDate);
				_self.addedUserModel().LastPasswordChangeDate(addedModel.LastPasswordChangeDate);
				_self.addedUserModel().FailedPasswordAttemptCount(addedModel.FailedPasswordAttemptCount);
				_self.addedUserModel().FailedPasswordAttemptWindowStart(addedModel.FailedPasswordAttemptWindowStart);
				_self.addedUserModel().FailedPasswordAnswerAttemptCount(addedModel.FailedPasswordAnswerAttemptCount);
				_self.addedUserModel().FailedPasswordAnswerAttemptWindowStart(addedModel.FailedPasswordAnswerAttemptWindowStart);
				_self.addedUserModel().Comment(addedModel.Comment);
				_self.addedUserModel().PasswordSalt(addedModel.PasswordSalt);
				_self.addedUserModel().Password(addedModel.Password);
				_self.addedUserModel().LoweredEmail(addedModel.LoweredEmail);
				_self.addedUserModel().Email(addedModel.Email);
				_self.addedUserModel().PasswordFormat(addedModel.PasswordFormat);
				_self.addedUserModel().IsOnline(addedModel.IsOnline);
				_self.addedUserModel().IsLockedOut(addedModel.IsLockedOut);
				_self.addedUserModel().IsApproved(addedModel.IsApproved);
				_self.addedUserModel().PasswordAnswer(addedModel.PasswordAnswer);
				_self.addedUserModel().PasswordQuestion(addedModel.PasswordQuestion);
				_self.addedUserModel().PromotionCode(addedModel.PromotionCode);
				_self.addedUserModel().Bio(addedModel.Bio);
				_self.addedUserModel().PrimaryImage(addedModel.PrimaryImage);
				_self.addedUserModel().SecondaryImage(addedModel.SecondaryImage);
				_self.addedUserModel().BackgroundImage(addedModel.BackgroundImage);
				_self.addedUserModel().City(addedModel.City);
				_self.addedUserModel().State(addedModel.State);
				_self.addedUserModel().Company(addedModel.Company);
				_self.addedUserModel().Department(addedModel.Department);
				_self.addedUserModel().Occupation(addedModel.Occupation);
				_self.addedUserModel().FirstName(addedModel.FirstName);
				_self.addedUserModel().LastName(addedModel.LastName);
				_self.addedUserModel().Sex(addedModel.Sex);
				_self.addedUserModel().HeightFeet(addedModel.HeightFeet);
				_self.addedUserModel().HeightInches(addedModel.HeightInches);
				_self.addedUserModel().Weight(addedModel.Weight);
				_self.addedUserModel().GeneralHealth(addedModel.GeneralHealth);
				_self.addedUserModel().PhoneHome(addedModel.PhoneHome);
				_self.addedUserModel().PhoneCell(addedModel.PhoneCell);
				_self.addedUserModel().PhoneOffice(addedModel.PhoneOffice);
				_self.addedUserModel().Address(addedModel.Address);
				_self.addedUserModel().ManageNotifications(addedModel.ManageNotifications);
				_self.addedUserModel().Notifications(addedModel.Notifications);
	
                if (callbackSuccess) {
                    callbackSuccess(addedModel.Id);
                }

                console.log('Success added User item ' + addedModel.Id + '.');

            },
            error: function (xhr, textStatus, errorThrown) {

                if (callbackFail) {
                    callbackFail(errorThrown);
                }

                console.log('Failed to add new User model.');
            }
        });
    }

	 _self.commitRemovedUserModel = function (callbackSuccess, callbackFail) {
        var id;
        if (ko.isObservable(_self.removedUserModel().Id)) {
            id = _self.removedUserModel().Id();
        } else {
            id = _self.removedUserModel().Id;
        }

        $.ajax('/api/Liveo.Platform/UserApi' + '?Id=' + id, {
            type: 'delete', contentType: 'application/json', dataType: 'json',
            success: function () {
                _self.userModels.remove(_self.removedUserModel());
                if (callbackSuccess) {
                    callbackSuccess(id);
                }
                console.log('Success removed User item ' + id + '.');
            },
            error: function (xhr, textStatus, errorThrown) {
                if (callbackFail) {
                    callbackFail(errorThrown);
                }
                console.log('Failed to remove User item ' + id + '.');
            }
        });
    }
   
    _self.saveUserAll = function () {
        var jsonData = ko.toJSON(_self.userModels);
        console.log('Save whole viewmodel ' + '\r\n' + jsonData);
    }

}

