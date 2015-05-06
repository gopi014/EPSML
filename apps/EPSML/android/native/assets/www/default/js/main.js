
/* JavaScript content from js/main.js in folder common */
var busyIndicator;
var busy;
var summ=[];
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
var length=entry.length;
for(var i=0;i<length;i++)
	{
	
var content = entry[i].content;
var activityentry=content.activityEntry;
var name=activityentry.actor.displayName;
var title=activityentry.object.displayName;
var publisheddate =activityentry.object.published;
var newdate= new Date(publisheddate);
var finaldate=newdate.toLocaleString();
var summary = activityentry.object.summary;
summ[i]=summary;
var finalsummary=summary.substring(0,100)+'....';
var ul = document.getElementById('recentupdates');
var li = document.createElement("li");
var li1 =document.createElement("li");
var a =document.createElement("a");
var h3=document.createElement("p");
var p=document.createElement("p");
var p1=document.createElement("p");
var p2=document.createElement("p");
li.appendChild(document.createTextNode(title));
li.setAttribute("data-role", "list-divider");
li.setAttribute("class","ui-list");
li.setAttribute("id","wihead"+i);
ul.appendChild(li);
li1.appendChild(document.createTextNode(""));
a.setAttribute('href', "#");
a.setAttribute('id', i);
a.setAttribute('onclick', 'wikidetail(id);');
a.setAttribute('class', 'wikia');
h3.innerHTML="Author:"+name;
h3.setAttribute("id","wiauth"+i);
p.innerHTML="<b>Description<b>:<br>"+finalsummary;
p2.innerHTML="Description"+summary;
p2.setAttribute("id","wisum"+i);
p2.setAttribute("style","display:none;");
p1.setAttribute("class","dateright");
p1.innerHTML="Last update:"+finaldate;
p1.setAttribute("id","widate"+i);
a.appendChild(p1);
a.appendChild(h3);
a.appendChild(p);
a.appendChild(p2);
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
function wikidetail(par){
	var wikidesc = document.getElementById('wikidesc');
	var header=$("#wihead"+par).text();
	var author=$("#wiauth"+par).text();
	var sum=summ[par];
	var date=$("#widate"+par).text();
	$('#wikiheader').text(header);
	$('#wikiauthor').text(author);
	wikidesc.innerHTML='<b>Summary:</b><br>'+sum;
	$('#wikidate').text(date);
	$('#wikiBody').hide();
	$('#wikiBody1').show();
}
function back(){
	$('#wikiBody1').hide();
	$('#wikiBody').show();
	}
function wfhleave(){
	$('#AppBody').hide();
	$('#wfhleave').show();
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}