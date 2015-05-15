
/* JavaScript content from js/CustomAuthenticatorRealmChallengeHandler.js in folder common */
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
        	$('#loginmesg').text('*'+response.responseJSON.errorMessage);
        	
        }
	} else if (authStatus == "complete"){
		var email=$('#usernameInputField').val();
		var invocationData = {
				adapter: "Validate",
				procedure: "validate",
				parameters: [email]
		};
		var options ={
				onSuccess: getSecretData_Callback,
				onFailure: getSecretData_Callback1
			  }
		WL.Client.invokeProcedure(invocationData,options );
		
		
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

function getSecretData_Callback(response){
	var invocationResult = response.invocationResult;
	var result = invocationResult.resultSet;
	var length = result.length;
	
	if(length == 0)
		{
		$('#loginmesg').text("Sorry!You Don't have permission to view This page");
		busyIndicator.hide();
		}
	
	else if (result[0].team == 'Pem'){
		$('#AppBody').show();
		$('#AuthBody').hide();
		$('#semployee').hide();
		$('#leavewfh').hide();
		$('#start').hide();
		$('#wikiupdates').hide();
		busyIndicator.hide();
	}
	else {	
	
	
	var team=result[0].team;
	if((team == 'Manager') || (team == 'PL') )
		{
		
		$('#AppBody').show();
		$('#AuthBody').hide();
		$('#semployee').hide();
		$('#smanager').show();
		$('#start').hide();
		$('#onshift').show();
		busyIndicator.hide();
		}
	else{
		document.getElementById("teamname").value = team;
		$('#AppBody').show();
		$('#AuthBody').hide();
		busyIndicator.hide();
	}
	}
}
function getSecretData_Callback1(response){
	$('#loginmesg').text("*Database error.please contact your DBA");
	busyIndicator.hide();
}
