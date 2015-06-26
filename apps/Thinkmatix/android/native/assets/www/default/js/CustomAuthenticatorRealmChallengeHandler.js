
/* JavaScript content from js/CustomAuthenticatorRealmChallengeHandler.js in folder common */
/*
*  Licensed Materials - Property of IBM
*  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/// /////////////////////
// Challenge Handler
// /////////////////////
var result;
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
		if (result[0].TEAM == 'Pem'){
			localStorage.setItem("username" ,$('#usernameInputField').val() );
			localStorage.setItem("password" ,$('#passwordInputField').val());
			localStorage.setItem("userid" ,result[0].EMP_ID);
			localStorage.setItem("userteam" ,result[0].TEAM);
			$('#AppBody').show();
			$('#AuthBody').hide();
			$('#smanager').hide();
			$('#leavewfh').hide();
			$('#start').hide();
			$('#wikiupdates').hide();
			$('#shiftactualuser').hide();
			$('#shiftactualpem').show();
			busyIndicator.hide();
		}
		else {	
		
		var team=result[0].TEAM;
		if((team == 'Manager') || (team == 'PL') )
			{
			localStorage.setItem("username" ,$('#usernameInputField').val() );
			localStorage.setItem("password" ,$('#passwordInputField').val());
			localStorage.setItem("userid" ,result[0].EMP_ID);
			localStorage.setItem("userteam" ,result[0].TEAM);
			$('#AppBody').show();
			$('#AuthBody').hide();
			$('#start').hide();
			$('#onshift').show();
			$('#shiftactualuser').hide();
			$('#shiftactualmanager').show();
			busyIndicator.hide();
			}
		else{
			localStorage.setItem("username" ,$('#usernameInputField').val() );
			localStorage.setItem("password" ,$('#passwordInputField').val());
			localStorage.setItem("userid" ,result[0].EMP_ID);
			localStorage.setItem("userteam" ,result[0].TEAM);
			$("#teamname").val(team);
			$('#AppBody').show();
			$('#AuthBody').hide();
			useremp_id=localStorage.getItem('userid');
			busyIndicator.hide();
		}
		}
		
	}
};

customAuthenticatorRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = customAuthenticatorRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	customAuthenticatorRealmChallengeHandler.handleChallenge(response);
    } 
};
$('#passwordInputField').bind('keypress',(function(e){
    if(e.which == 13){//Enter key pressed
        $('#loginButton').click();//Trigger search button click event
    }
}));
$('#loginButton').bind('click', function () {
	if(connectstatus =="disconnected")	{
		$('#loginmesg').text("Could not connect to Server.");
	}
	else{
	busyIndicator.show();
	username=$('#usernameInputField').val();
	password=$('#passwordInputField').val();
	if((username =='') ||(password =='') )
		{
		$('#loginmesg').text('* Please enter a valid username & password');
		busyIndicator.hide();
		}
	else{
		
		var invocationData = {
				adapter: "Validate",
				procedure: "validate",
				parameters: [username]
		};
		var options ={
				onSuccess: getSecretData_Callback,
				onFailure: getSecretData_Callback1
			  };
		WL.Client.invokeProcedure(invocationData,options );
		
		
		
	}
        	
	}       
	});

$('#cancelButton').bind('click', function () {
	
	$('#AppBody').show();
	$('#AuthBody').hide();
	customAuthenticatorRealmChallengeHandler.submitFailure();
});

function getSecretData_Callback(response){
	var invocationResult = response.invocationResult;
	result = invocationResult.resultSet;
	var length = result.length;
	
	if(length == 0)
		{
		$('#loginmesg').text("Sorry!You Don't have permission to view this application");
		busyIndicator.hide();
		}
	else{
		var reqURL = '/my_custom_auth_request_url';
        var options = {};
        options.parameters = {
            username : $('#usernameInputField').val(),
            password : $('#passwordInputField').val()
        };
        options.headers = {};
        customAuthenticatorRealmChallengeHandler.submitLoginForm(reqURL, options, customAuthenticatorRealmChallengeHandler.submitLoginFormCallback);

	}
	
}
function getSecretData_Callback1(response){
	$('#loginmesg').text("Database error.please contact your DBA");
	busyIndicator.hide();
}
function logoutSuccess(response){
	WL.Client.reloadApp;
}