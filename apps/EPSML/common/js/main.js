var busyIndicator;
var busy;
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
function shift(){
	$('#AppBody').hide();
	$('#eshift').show();
}
function home()
{
	$('#AppBody').show();
	$('#wikiBody').hide();
	$('#eshift').hide();
	}

function wiki(){
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var n='gopinathrk@in.ibm.com';
	var m='gopi4ibm';
	var invocationData = {
			adapter: "WikiUpdates",
			procedure: "getfeeds",
			parameters: [n,m]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : feedsSuccess,
        onFailure : feedsFailure,
    });

}
function feedsSuccess(response){
	
var invocationResult = response.invocationResult;

var feeds = invocationResult.feed;
var entry= feeds.entry;

for(var i=0;i<5;i++)
	{
	
var content = entry[i].content;
var activityentry=content.activityEntry;
var name=activityentry.actor.displayName;
var title=activityentry.object.displayName;
var publisheddate =activityentry.object.published;
var newdate= new Date(publisheddate);
var finaldate=newdate.toLocaleString();
var summary = activityentry.object.summary;

var finalsummary=summary.substring(0,100)+'....';
var ul = document.getElementById('recentupdates');
var li = document.createElement("li");
var li1 =document.createElement("li");
var a =document.createElement("a");
var h3=document.createElement("h3");
var p=document.createElement("p");
var p1=document.createElement("p");
li.appendChild(document.createTextNode(title));
li.setAttribute("data-role", "list-divider");
li.setAttribute("class","ui-list");
ul.appendChild(li);
li1.appendChild(document.createTextNode(""));
a.setAttribute('href', "#");
h3.value("Author:"+name);
p.value("Description"+finalsummary);
p1.value("Last update:"+finaldate);
p1.setattribute("class","ui-li-aside");
a.appendChild(p1);
a.appendChild(p);
a.appendChild(h3);
li1.appendChild(a);
ul.appendChild(li1);
	}
	busy.hide();
$('#AppBody').hide();
$('#wikiBody').show();
}
function feedsFailure(response){
	busy.hide();
	alert("failure");
}