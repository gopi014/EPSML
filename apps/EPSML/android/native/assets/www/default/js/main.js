
/* JavaScript content from js/main.js in folder common */
var busyIndicator;
function wlCommonInit(){
	
	getSecretData();
	WL.ClientMessages.loading = "Authenticating";
	busyIndicator = new WL.BusyIndicator ();
}

function getSecretData(){
	
	//busyIndicator = new WL.BusyIndicator ("", {text: "Please wait..."});
	var invocationData = {
			adapter: "LoginAdapter",
			procedure: "getSecretData",
			parameters: []
	};
	var options ={
			onSuccess: getSecretData_Callback,
			onFailure: getSecretData_Callback
		  }
	WL.Client.invokeProcedure(invocationData,options );
	
}

function getSecretData_Callback(response){
	busyIndicator.hide();
	//alert("getSecretData_Callback response :: " + JSON.stringify(response));
}



/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}