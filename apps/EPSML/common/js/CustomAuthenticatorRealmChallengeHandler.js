/*
*  Licensed Materials - Property of IBM
*  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/// /////////////////////
// Challenge Handler
// /////////////////////
var customAuthenticatorRealmChallengeHandler = WL.Client.createChallengeHandler("CustomAuthenticatorRealm");

customAuthenticatorRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || !response.responseJSON) {
        return false;
    }
    
    if (response.responseJSON.authStatus) 
    	return true;
    else 
    	return false;
};

customAuthenticatorRealmChallengeHandler.handleChallenge = function(response){
	var authStatus = response.responseJSON.authStatus;
	
	if (authStatus == "required"){
		$('#AppBody').hide();
		$('#AuthBody').show();
		$('#passwordInputField').val('');
        if (response.responseJSON.errorMessage){
        	busyIndicator.hide();
        	alert(response.responseJSON.errorMessage);
        	
        }
	} else if (authStatus == "complete"){
		$('#AppBody').show();
		$('#AuthBody').hide();
		customAuthenticatorRealmChallengeHandler.submitSuccess();
	}
};

customAuthenticatorRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = customAuthenticatorRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	customAuthenticatorRealmChallengeHandler.handleChallenge(response);
    } 
};

$('#loginButton').bind('click', function () {
	
	busyIndicator.show();
    var reqURL = '/my_custom_auth_request_url';
    var options = {};
    options.parameters = {
        username : $('#usernameInputField').val(),
        password : $('#passwordInputField').val()
    };
    options.headers = {};
    customAuthenticatorRealmChallengeHandler.submitLoginForm(reqURL, options, customAuthenticatorRealmChallengeHandler.submitLoginFormCallback);
});

$('#cancelButton').bind('click', function () {
	$('#AppBody').show();
	$('#AuthBody').hide();
	customAuthenticatorRealmChallengeHandler.submitFailure();
});


