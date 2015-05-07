
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
		  };
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
	$.mobile.changePage( "#AppBody");
	}

function wiki(){
	var ullength=$("#recentupdates li").length;
	if(ullength == 0)
		{
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
	else{
		$('#wikiContent').empty();
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
}
function feedsSuccess(response){
	
var invocationResult = response.invocationResult;

var feeds = invocationResult.feed;
var entry= feeds.entry;
var length=entry.length;
var div=document.getElementById('wikiContent');
var ul = document.createElement('ul');
ul.setAttribute('data-role','listview');
ul.setAttribute('data-inset','true');
ul.setAttribute('id','recentupdates');

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
var li = document.createElement("li");
var a =document.createElement("a");
var h2=document.createElement("h2");
var p=document.createElement("p");
var p1=document.createElement("p");
var p3=document.createElement("p");
li.appendChild(document.createTextNode(""));
a.setAttribute('href', "#");
a.setAttribute('id', i);
a.setAttribute('onclick', 'wikidetail(id);');
a.setAttribute('class', 'wikia');
h2.setAttribute("id","wihead"+i);
h2.innerHTML=title;
p.innerHTML="<strong>"+name+"<strong>";
p.setAttribute("id","wiauth"+i);
p1.innerHTML="<b>Description<b>:<br>"+finalsummary;
p3.setAttribute("class","ui-li-aside");
p3.innerHTML="<strong>Last update:"+finaldate+"<strong>";
p3.setAttribute("id","widate"+i);
a.appendChild(h2);
a.appendChild(p);
a.appendChild(p1);
a.appendChild(p3);
li.appendChild(a);
ul.appendChild(li);

	}
div.appendChild(ul);
	busy.hide();
	$.mobile.changePage( "#wikiBody");
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
	$.mobile.changePage('wiki.html', {transition: 'flip', prefetch:'true'});
	
}
function back(){
	$.mobile.changePage( "#wikiBody");
	}
function wfhleave(){
	$.mobile.changePage( "#wfhleave");
}
function logout(){
	var options={
			onSuccess : logoutSuccess,
	};
	WL.Client.logout('CustomAuthenticatorRealm',options);
}
function logoutSuccess(){
	WL.Client.reloadApp;
	$.mobile.changePage('index.html', { reloadPage: true });
	
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}