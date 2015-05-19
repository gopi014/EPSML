
/* JavaScript content from js/main.js in folder common */
var busyIndicator;
var busy;
var summ=[];
var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
<<<<<<< HEAD
var currmonth = month[d.getMonth()];
=======
var currmonth = month[d.getMonth()]; 
>>>>>>> origin/master
var currday=d.getDate();
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
<<<<<<< HEAD
$('#AppBody').hide();
$.mobile.changePage( "#shiftmanager",{ changeHash: false });
=======
	$('#AppBody').hide();
	$.mobile.changePage( "#shiftmanager",{ changeHash: false });
>>>>>>> origin/master
}
function home()
{
$.mobile.changePage( "#AppBody",{ changeHash: false });
$('#AppBody').show();
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
$('#recentupdates').remove();
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
ul.setAttribute('class','ui-listview ui-listview-inset ui-corner-all ui-shadow');
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
a.setAttribute('class', 'wikia ui-btn ui-btn-icon-right ui-icon-carat-r');
h2.setAttribute("id","wihead"+i);
h2.innerHTML=title;
p.innerHTML="<strong>"+name+"<strong>";
p.setAttribute("id","wiauth"+i);
p1.innerHTML="<b>Description<b>:<br>"+finalsummary;
//p3.setAttribute("class","ui-li-aside");
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
$('#AppBody').hide();
$.mobile.changePage( "#wikiBody",{ changeHash: false });
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
$.mobile.changePage( "#wikiBody1",{ changeHash: false });
}
function back(){
$.mobile.changePage( "#wikiBody",{ changeHash: false });
}
function wfhleave(){
}
function logout(){
var options={
onSuccess : WL.Client.reloadApp,
};
WL.Client.logout('CustomAuthenticatorRealm',options);
}
function getleavewfh()
{
var ullength=$("#fragment-2ul li").length;
var ullength1=$("#fragment-1ul li").length;
if((ullength == 0) ){
if((ullength1 == 0)){
WL.ClientMessages.loading = "Loading!Please wait...";
busy = new WL.BusyIndicator ();
busy.show();
var n='gopinathrk@in.ibm.com';
var m='gopi4ibm';
var invocationData = {
adapter: "Leavewfh",
procedure: "getleavewfh",
parameters: [n,m]
};
WL.Client.invokeProcedure(invocationData,{
onSuccess : leaveSuccess,
onFailure : leaveFailure,
});
}
else{
$('#fragment-1ul li').remove();
WL.ClientMessages.loading = "Loading!Please wait...";
busy = new WL.BusyIndicator ();
busy.show();
var n='gopinathrk@in.ibm.com';
var m='gopi4ibm';
var invocationData = {
adapter: "Leavewfh",
procedure: "getleavewfh",
parameters: [n,m]
};
WL.Client.invokeProcedure(invocationData,{
onSuccess : leaveSuccess,
onFailure : leaveFailure,
});
}
}
else{
$('#fragment-2ul li').remove();
$('#fragment-1ul li').remove();
WL.ClientMessages.loading = "Loading!Please wait...";
busy = new WL.BusyIndicator ();
busy.show();
var n='gopinathrk@in.ibm.com';
var m='gopi4ibm';
var invocationData = {
adapter: "Leavewfh",
procedure: "getleavewfh",
parameters: [n,m]
};
WL.Client.invokeProcedure(invocationData,{
onSuccess : leaveSuccess,
onFailure : leaveFailure,
});
}
}
function leaveSuccess(response){
var invocationResult = response.invocationResult;
var feeds = invocationResult.feed;
var entry= feeds.entry;
var length=entry.length;
var i= length-1;
var content = entry[i].content;
var cdata=content.CDATA;
cdata=$(cdata);
var ul=document.getElementById('fragment-2ul');
var ul1=document.getElementById('fragment-1ul');
cdata.find("tbody tr").slice(1).each(function(){
var Name =$(this).find("td:eq(0)").text();
var Date =$(this).find("td:eq(1)").text();
var RequestType =($(this).find("td:eq(2)").text()).trim();
if (RequestType == 'PL'){
var li = document.createElement("li");
var p=document.createElement("p");
var p1=document.createElement("p");
li.style.background='#3DC8F3';
p.innerHTML="<strong>"+Name+"</strong>";
p1.innerHTML=Date;
li.appendChild(p);
li.appendChild(p1);
ul.appendChild(li);
}
else{
var li1 = document.createElement("li");
var p2=document.createElement("p");
var p3=document.createElement("p");
li1.style.background='#3DC8F3';
p2.innerHTML="<strong>"+Name+"</strong>";
p3.innerHTML=Date;
li1.appendChild(p2);
li1.appendChild(p3);
ul1.appendChild(li1);
}
});
busy.hide();
$.mobile.changePage( "#wfhleave",{ changeHash: false });
}
function leaveFailure(response){
alert("Faliure");
}
function teamchange(){
WL.ClientMessages.loading = "Loading!Please wait...";
busy = new WL.BusyIndicator ();
var teamname = document.getElementById("select-custom-20").value;
var tablesize=$('#shimanager tbody tr').length;
if(tablesize == 0){
var invocationData = {
adapter: "Validate",
procedure: "smanager",
parameters: [teamname,currmonth]
};
WL.Client.invokeProcedure(invocationData,{
onSuccess : teamchangeSuccess,
onFailure : teamchangeFailure,
});
}
else{
$('#shimanager tbody tr').remove();
$('#shimanager thead tr').remove();
var invocationData = {
adapter: "Validate",
procedure: "smanager",
parameters: [teamname,currmonth]
};
WL.Client.invokeProcedure(invocationData,{
onSuccess : teamchangeSuccess,
onFailure : teamchangeFailure,
});
}
}
function teamchangeSuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	var tableName =document.getElementById("emp_name");
	var currentdate1=currday;
	for(var k=0;k<length;k++){
	var row=tableName.insertRow(k);
	if(k==0){
	var cell=row.insertCell(k);
	cell.innerHTML='Name';
	}
	else{
	var cell=row.insertCell(k);
	cell.innerHTML=currmonth+ ' '+currentdate1;
	currentdate1++;
	}
	}
	var tableData =document.getElementById("emp_data");
	for(var i=0;i<length;i++){
	var row=tableData.insertRow(i);
	if(i==0){
		for(j=0;j<(33-currday);j++)
		{
			var dateCell=row.insertCell(j);
			dateCell.innerHTML=currmonth+ ' '+currentdate1;
			currentdate1++;
		}
	}
	else{
		for(var l=0;l<length;l++)
			{
			var row1=tableData.insertRow(l);
			var name = resultset[l].emp_name;
			var cell1=row1.insertCell(0);
			cell1.innerHTML=name;
			cell1.setAttribute('id','emp_name');
			var currentdate=currday;
				for(var j=1;j<(33-currday);j++)
				{
						var cell2=row1.insertCell(j);
							if(resultset[l]['day'+currentdate] =='First')
								{
								cell2.setAttribute("style", "background-color: #F4FA58;");
							}
							if(resultset[l]['day'+currentdate] =='Second' )
								{
								cell2.setAttribute("style", "background-color: #F78181;");
							}			
							if(resultset[l]['day'+currentdate] =='Third' )
								{
								cell2.setAttribute("style", "background-color: #58FAD0;");
							}
							if(resultset[l]['day'+currentdate] =='General' )
								{
								cell2.setAttribute("style", "background-color: #82FA58;");
							}
							if(resultset[l]['day'+currentdate] =='Week Off' )
								{
								cell2.setAttribute("style", "background-color: #58FAD0;");
							}
							if(resultset[l]['day'+currentdate] =='Week Off' )
								{
							cell2.setAttribute("style", "background-color: #58FAD0;");
							}
							else if(resultset[l]['day'+currentdate] =='PL' || resultset[l]['day'+currentdate] =='Comp off')
								{
							cell2.setAttribute("style", "background-color: #F78181;");
							}
							cell2.innerHTML='';
							currentdate++;
				}
			}
		}
	}
busy.hide();
$.mobile.changePage( "#shiftmanager",{ changeHash: false });
}
function teamchangeFailure(response)
{
alert('falure');
}
function sp1() {
$('#sp2').removeClass("ui-state-persist");
$('#sp1').addClass("ui-state-persist");
}
function sp2() {
$('#sp1').removeClass("ui-state-persist");
$('#sp2').addClass("ui-state-persist");
}
function teamchange(){
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	var teamname = document.getElementById("select-custom-20").value;
	var tablesize=$('#shimanager tbody tr').length;
	if(tablesize == 0){
		
	
	var invocationData = {
			adapter: "Validate",
			procedure: "smanager",
			parameters: [teamname,currmonth]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : teamchangeSuccess,
        onFailure : teamchangeFailure,
    });
	}
	else{
		$('#shimanager tbody tr').remove();
		$('#shimanager thead tr').remove();
		var invocationData = {
				adapter: "Validate",
				procedure: "smanager",
				parameters: [teamname,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : teamchangeSuccess,
	        onFailure : teamchangeFailure,
	    });
		
	}
}
function teamchangeSuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	var table =document.getElementById("shimanager");
	var header=table.createTHead();
	var body=table.createTBody();
	var row=header.insertRow(0);
	var currentdate1=currday;
		for(k=0;k<(33-currday);k++){
			if(k==0){
				var cell=row.insertCell(k);
				cell.innerHTML='Name';
			}
			else{
		var cell=row.insertCell(k);
		cell.innerHTML=currmonth+ ' '+currentdate1;
		currentdate1++;
			}
	
			}
		
	for(i=0;i<length;i++){
		var row1=body.insertRow(i);
		var name = resultset[i].emp_name;
		var cell1=row1.insertCell(0);
		cell1.innerHTML=name;
		cell1.setAttribute('id','emp_name');
		var currentdate=currday;
		for(var j=1;j<(33-currday);j++){
			var cell2=row1.insertCell(j);
			if(resultset[i]['day'+currentdate] =='Week Off' )
				{
				cell2.setAttribute("style", "background-color: #58FAD0;");
				}
			else if(resultset[i]['day'+currentdate] =='PL' || resultset[i]['day'+currentdate] =='Comp off')
			{
				cell2.setAttribute("style", "background-color: #F78181;");
				}
			cell2.innerHTML=resultset[i]['day'+currentdate];
			currentdate++;
		}
		}
	busy.hide();
	$.mobile.changePage( "#shiftmanager",{ changeHash: false });
	}
function teamchangeFailure(response)
{
	alert('falure');
	}


function ShiftSchedule_user(){
	
	var teamname=document.getElementById("teamname").value ;
	var invocationData = {
			adapter: "Validate",
			procedure: "getUserShiftSchedule",
			parameters: [teamname,currmonth]
	};
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : ShiftSchedule_UserSuccess,
        onFailure : ShiftSchedule_UserFailure,
    });
    

}

function ShiftSchedule_UserSuccess(response){
	;
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	var table =document.getElementById("ssusertable");
	
	var header=table.createTHead();
	var body=table.createTBody();
	var row=header.insertRow(0);
	var currentdate1=currday;
		for(k=0;k<(33-currday);k++){
			if(k==0){
				var cell=row.insertCell(k);
				cell.innerHTML='Name';
			}
			else{
		var cell=row.insertCell(k);
		cell.innerHTML=currmonth+ ' '+currentdate1;
		currentdate1++;
			}
	
			}
		alert(length)
	for(i=0;i<length;i++){
		var row1=body.insertRow(i);
		var name = resultset[i].emp_name;
		
		var cell1=row1.insertCell(0);
		cell1.innerHTML=name;
		cell1.setAttribute('id','emp_name');
		var currentdate=currday;
		
		for(var j=1;j<(33-currday);j++){
			
			var cell2=row1.insertCell(j);
			if(resultset[i]['day'+currentdate] =='Week Off' )
				{
				cell2.setAttribute("style", "background-color: #58FAD0;");
				}
			else if(resultset[i]['day'+currentdate] =='PL' || resultset[i]['day'+currentdate] =='Comp off')
			{
				cell2.setAttribute("style", "background-color: #F78181;");
				}
			cell2.innerHTML=resultset[i]['day'+currentdate];
			currentdate++;
		}
		}
	//busy.hide();
	$('#AppBody').hide();
    $('#shiftschedule_userp').show();
	//$.mobile.changePage( "#shiftmanager",{ changeHash: false });
	
	}


function ShiftSchedule_UserFailure(response){
	alert("failure");
}

function sp1() {
	$('#sp2').removeClass("ui-state-persist");
	$('#sp1').addClass("ui-state-persist");
	
}
function sp2() {
	$('#sp1').removeClass("ui-state-persist");
	$('#sp2').addClass("ui-state-persist");
	
}


/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}