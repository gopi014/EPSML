
/* JavaScript content from js/main.js in folder common */
var busyIndicator;
var busy;
var busy1;
var summ=[];
var connectstatus;
var shifthold;
var d = new Date();
var month = new Array();
var teamname1;
var useremp_id;
var n;
var m;
var flag=0;

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
var currmonth = month[d.getMonth()]; 
var currday=d.getDate();
function wlCommonInit(){
	WL.Client.setHeartBeatInterval(5);
	document.addEventListener(WL.Events.WORKLIGHT_IS_CONNECTED, connectDetected, false); 
	document.addEventListener(WL.Events.WORKLIGHT_IS_DISCONNECTED, disconnectDetected , false);
		getSecretData();
		WL.ClientMessages.loading = "Authenticating";
		busyIndicator = new WL.BusyIndicator ();
	
	
    
}
function connectionFailure(){
	alert("Could not connect to the MobileFirst Server.");
	
}

function disconnectDetected(){
	connectstatus="disconnected";
	
}

function connectDetected(){
	connectstatus="connected";
}
//login module start
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
//login module end
//shift schedule start
function shift(){
	var tablesize1=$('#emp_name tr').length;
	if(tablesize1 == 0){
		$('#AppBody').hide();
		$.mobile.changePage( "#shiftmanager",{ changeHash: false });
	}
	else{
		$('#emp_name tr').remove();
		$('#emp_data tr').remove();
		var myselect = $("select#select-custom-20");
		myselect[0].selectedIndex = 0;
		myselect.selectmenu("refresh");
		$('#AppBody').hide();
		$.mobile.changePage( "#shiftmanager",{ changeHash: false });
	}
	
	}
	
function home()
{
	$.mobile.changePage( "#AppBody",{ changeHash: false });
	$('#AppBody').show();
	}

function wiki(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	var ullength=$("#recentupdates li").length;
	if(ullength == 0)
		{
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var lusername=$('#usernameInputField').val();
	var lpassword=$('#passwordInputField').val();
	var invocationData = {
			adapter: "WikiUpdates",
			procedure: "getfeeds",
			parameters: [lusername,lpassword]
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
		var lusername=$('#usernameInputField').val();
		var lpassword=$('#passwordInputField').val();
		var invocationData = {
				adapter: "WikiUpdates",
				procedure: "getfeeds",
				parameters: [lusername,lpassword]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : feedsSuccess,
	        onFailure : feedsFailure,
	    });
	}
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
	if(!entry[i].summary.CDATA){
		
	}
	else{
//var content = entry[i].content;
//var activityentry=entry[i].contentModifiedBy;
var name=entry[i].author.name;
var title=entry[i].title;
//var publisheddate =entry[i].updated;
//var newdate= new Date(publisheddate);
//var finaldate=newdate.toLocaleString();
var summary =entry[i].summary.CDATA;
summ[i]=summary;
var finalsummary=summary.substring(0,100)+'....';
var li = document.createElement("li");
var a =document.createElement("a");
var h2=document.createElement("h2");
var p=document.createElement("p");
var p1=document.createElement("p");
//var p3=document.createElement("p");
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
//p3.innerHTML="<strong>Last update:"+finaldate+"<strong>";
//p3.setAttribute("id","widate"+i);
a.appendChild(h2);
a.appendChild(p);
a.appendChild(p1);
//a.appendChild(p3);
li.appendChild(a);
ul.appendChild(li);
	}
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
	$('#wikiheader').text(header);
	$('#wikiauthor').text(author);
	wikidesc.innerHTML='<b>Summary:</b><br>'+sum;
	
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
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
	var ullength=$("#fragment-2ul li").length;
	var ullength1=$("#fragment-1ul li").length;
	if((ullength == 0) ){
		if((ullength1 == 0)){
			n=$('#usernameInputField').val();
			m=$('#passwordInputField').val();		
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
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
			n=$('#usernameInputField').val();
			m=$('#passwordInputField').val();
			busy = new WL.BusyIndicator ();
			busy.show();
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
		
		n=$('#usernameInputField').val();
		m=$('#passwordInputField').val();
		WL.ClientMessages.loading = "Loading!Please wait...";
		busy = new WL.BusyIndicator ();
		busy.show();
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
	$('#AppBody').hide();
	$.mobile.changePage( "#wfhleave",{ changeHash: false });	
}
function leaveFailure(response){
	
	alert("Faliure");
}
function teamchange(){
	if(connectstatus =="disconnected")	{
		alert("Could not connect to Server.");
	}
	else{
		
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	busy.show();
	var teamname = document.getElementById("select-custom-20").value;
	var tablesize=$('#emp_name tr').length;
	if(tablesize == 0){
		teamname1=teamname;
	
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
		if(teamname == teamname1){
			$.mobile.changePage( "#shiftmanager",{ changeHash: false });	
		}
		else{
		teamname1=teamname;
		$('#emp_name tr').remove();
		$('#emp_data tr').remove();
		var invocationData1 = {
				adapter: "Validate",
				procedure: "smanager",
				parameters: [teamname,currmonth]
		};
		WL.Client.invokeProcedure(invocationData1,{
	        onSuccess : teamchangeSuccess,
	        onFailure : teamchangeFailure,
	    });
		}
	}
}
function teamchangeSuccess(response)
{
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var length =resultset.length;
	var tableName =document.getElementById("emp_name");
	var cell1;
	for(var k=0;k<length+1;k++){
		if(k==0){
			var nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML='Name';
			cell1.setAttribute("style", "background-color: #0E74BC;");
			var name = resultset[k].emp_name;
			}
		else{
			 name = resultset[k-1].emp_name;
			nameRow = tableName.insertRow(k);
			cell1 = nameRow.insertCell(0);
			cell1.innerHTML = name;
			cell1.setAttribute("style", "background-color: #0E74BC;");
		}

	}
	var tableData =document.getElementById("emp_data");
	var currentdate1=currday;
	var currentdate2=currday;
	for(var i=0;i<=length;i++){
		var dataRow = tableData.insertRow(i);
		if (i==0){
			for(var j=0;j<(32-currday);j++)
				{
				var dateCell = dataRow.insertCell(j);
				dateCell.innerHTML = currmonth+ ' '+currentdate1;
				dateCell.setAttribute("style", "background-color: #0E74BC;");
				currentdate1++;
				}
		}else{
			for(j=0;j<(32-currday);j++){
				var shiftCell = dataRow.insertCell(j);
				//alert(resultset[i]['day'+currentdate1]);
				if(resultset[i-1]['day'+currentdate2] =='First' ){
					shiftCell.setAttribute("style", "background-color: #BDBDBD;");
				}
				if(resultset[i-1]['day'+currentdate2] =='Second' )
				{
					shiftCell.setAttribute("style", "background-color:#848484  ;");
				}
				if(resultset[i-1]['day'+currentdate2] =='Third' )
				{
					shiftCell.setAttribute("style", "background-color: #151515;");
				}
				if(resultset[i-1]['day'+currentdate2] =='General' )
				{
					shiftCell.setAttribute("style", "background-color: #F7D358;");
				}
				if(resultset[i-1]['day'+currentdate2] =='Week Off' )
				{
					shiftCell.setAttribute("style", "background-color: #F78181;");
				}
				else if(resultset[i-1]['day'+currentdate2] =='PL' || resultset[i-1]['day'+currentdate2] =='Comp off' || resultset[i-1]['day'+currentdate2] =='Comp-Off')
				{
					shiftCell.setAttribute("style", "background-color: #FE642E;");
				}
				shiftCell.innerHTML=resultset[i-1]['day'+currentdate2];
				currentdate2++;
			}
		}
		currentdate2=currday;
	}
busy.hide();
$.mobile.changePage( "#shiftmanager",{ changeHash: false });
}
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
function startshift(){
	$('#AppBody').hide();
	$.mobile.changePage( "#startshift",{ changeHash: false });
}

function startshiftprocess(){	
	var buttonclicked = document.getElementById("flip-min").value;
	if (buttonclicked == "on" && flag==0){
	var emp_id=$('#userid').text();
	
	var invocationData = {
			adapter: "Validate",
			procedure: "getshiftstarttime",
			parameters: [emp_id]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : startshiftSuccess,
        onFailure : startshiftFailure,
    });
	
	}

	else{
		
		//When stop button is clicked
		var emp_id=$('#userid').text();
		
		var invocationData = {
				adapter: "Validate",
				procedure: "getuserstoptime",
				parameters: [emp_id]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : stopshiftSuccess,
	        onFailure : stopshiftFailure,
	    });
	}
	}


function startshiftSuccess(response){
		var invocationResult = response.invocationResult;
		var resultset = invocationResult.resultSet;
		var timehold = resultset[0].start_time;
		shifthold = resultset[0].shift_name;
		
		d = new Date();
		var endHour = d.getUTCHours();
		var endMinute = d.getUTCMinutes();
		var endSecond =  d.getUTCSeconds();	
		
    	var startHour = timehold.substring(0,2);
		var startMinute = timehold.substring(3,5);
		var startSecond = timehold.substring(6,8); 		
		
		 
//		var startHour = 12;
//		var startMinute = 45;
//		var startSecond = 00;
//				
//		var endHour = 12;
//		var endMinute = 59;
//		var endSecond = 00;
				
		 
		 //Create date object and set the time to that
		 var startTimeObject = new Date();
		 startTimeObject.setHours(startHour, startMinute, startSecond);

		 //Create date object and set the time to that
		 var endTimeObject = new Date(startTimeObject);
		 endTimeObject.setHours(endHour, endMinute, endSecond);
		 
		 
		 var difference = (((endTimeObject.setHours(endHour, endMinute, endSecond)) - (startTimeObject.setHours(startHour, startMinute, startSecond))) / 1000)/60;
		//	alert (difference)	;	
		 
		 
		 if ((difference > 0 && difference < 31) || difference == 0){
			 var emp_id=$('#userid').text();
			 
				var invocationData = {
						adapter: "Validate",
						procedure: "shiftactualsselect",
						parameters: [emp_id,currmonth]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : selectshiftactualsSuccess,
			        onFailure : selectshiftactualsFailure,
			    });
			 	
		 }
		 else if(difference < 0){
			 // condition for shift swap 
			 var emp_id=$('#userid').text();
			 var team = $('#teamname').value();
			 var invocationData = {
						adapter: "Validate",
						procedure: "getteammembers",
						parameters: [emp_id,team]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : swapshiftSuccess,
			        onFailure : swapshiftFailure,
			    });
			 
		 }
		 else {
			 //conditions where they dint log in on time
			 alert("Please come on time to shift");
			 var emp_id=$('#userid').text();
			 
				var invocationData = {
						adapter: "Validate",
						procedure: "shiftactualsselect",
						parameters: [emp_id,currmonth]
				};
				WL.Client.invokeProcedure(invocationData,{
			        onSuccess : selectshiftactualsSuccess,
			        onFailure : selectshiftactualsFailure,
			    });
			 
		 }
}
function selectshiftactualsSuccess(response){
	
	var invocationResult = response.invocationResult;
	var results = invocationResult.resultSet;
	if (results.length > 0) {
		var emp_id=$('#userid').text();
		 
		var invocationData = {
				adapter: "Validate",
				procedure: "updateshiftactuals",
				parameters: [shifthold, emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : UpdateshiftactualsSuccess,
	        onFailure : UpdateshiftactualsFailure,
	    });
	 
		
	}
	
	else {
		var emp_id=$('#userid').text();
		 
		var invocationData = {
				adapter: "Validate",
				procedure: "insertshiftactuals",
				parameters: [emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : insertshiftactualsSuccess,
	        onFailure : insertshiftactualsFailure,
	    });
	 
				
	}

}

function selectshiftactualsFailure(response){
	alert("Failure in selectshiftactuals");

}

function insertshiftactualsSuccess(response){
	var emp_id=$('#userid').text();
	 
	var invocationData = {
			adapter: "Validate",
			procedure: "updateshiftactuals",
			parameters: [shifthold, emp_id,currmonth]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : completeStartSuccess,
        onFailure : completeStartFailure,
    });

}

function insertshiftactualsFailure(response){
	
alert ("Insert query has failed");
}



function startshiftFailure(response){
		alert("Failure in startshift ");
	}


function UpdateshiftactualsSuccess(response){
	alert("UpdateShift is a success");
	$('#shiftupdate').show();
	$('#prevupdate').show();
}

function UpdateshiftactualsFailure(response){
	alert("UpdateShift is a failure");

}

function completeStartSuccess(response){
	alert("Updated the shift! Now get to Work ");
	$('#shiftupdate').show();
	$('#prevupdate').show();
	
}

function completeStartFailure(response){
	alert("completefailure");
	
}
document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#AppBody')){
       
        navigator.app.exitApp();
    }
    else if($.mobile.activePage.is('#wikiBody1')){
    	$.mobile.changePage( "#wikiBody",{ changeHash: false });
    }
    else {
    	$.mobile.changePage( "#AppBody",{ changeHash: false });
    	$('#AppBody').show();
    }
}, false);
function stopshiftSuccess(response){
	var invocationResult = response.invocationResult;
	var resultset = invocationResult.resultSet;
	var timehold = resultset[0].end_time;
	shifthold = resultset[0].shift_name;
	
	d = new Date();
	var endHour = d.getUTCHours();
	var endMinute = d.getUTCMinutes();
	var endSecond =  d.getUTCSeconds();	
	
	var currdate =d.getDate();
	var currmonth1=d.getMonth();
	var curryear =d.getFullYear();
	
	var startHour = timehold.substring(0,2);
	var startMinute = timehold.substring(3,5);
	var startSecond = timehold.substring(6,8); 		
	
	 
//	var startHour = 12;
//	var startMinute = 45;
//	var startSecond = 00;
//			
	var subHour = 00;
	var subMinute = 30;
	var subSecond = 00;
			
	var olddate = new Date(curryear,currmonth1,currdate, startHour,startMinute,startSecond, 0); 
	var subbed = new Date(olddate - 30*60*1000);
	var stophour=subbed.getHours();
	var stopminute=subbed.getMinutes();
	var stopseconds=subbed.getSeconds();
	
	//Create date object and set the time to that
	 var startTimeObject = new Date();
	 startTimeObject.setHours(stophour, stopminute, stopseconds);

	 //Create date object and set the time to that
	 var endTimeObject = new Date(startTimeObject);
	 endTimeObject.setHours(endHour, endMinute, endSecond);
 
	             
	var difference = (((endTimeObject.setHours(endHour, endMinute, endSecond)) - (startTimeObject.setHours(stophour, stopminute, stopseconds))) / 1000)/60;
	if(difference>0){
		$('#shiftupdate').hide();
		flag=0;
		var emp_id=$('#userid').text();
		var invocationData = {
				adapter: "Validate",
				procedure: "stopupdate",
				parameters: [emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : StopupdateSuccess,
	        onFailure : StopupdateFailure,
	    });
		
	}
	else{
		alert("you are not allowed to end you shift before your end time");
		flag =1;
		$('#flip-min').val('on').slider("refresh");
		
	}
}
function stopshiftFailure(response){
	alert("Failure in stopshift ");
}
function doshiftupdate(){
	var emp_id=$('#userid').text();
	var invocationData = {
			adapter: "Validate",
			procedure: "stopupdate",
			parameters: [emp_id,currmonth]
	};
	WL.Client.invokeProcedure(invocationData,{
        onSuccess : StopupdateSuccess,
        onFailure : StopupdateFailure,
    });
}
function StopupdateSuccess(response){
	var resultset =response.invocationResult.resultSet;
	var length=resultset.length;
	if(length==0){
		$.mobile.changePage( "#shiftdialog",{ changeHash: false });
	}
	else{
		var currentday=new Date().getDate();
		var update= resultset[0]['day'+currentday];
	    $("#updateshift").val(update);
		$.mobile.changePage( "#shiftdialog",{ changeHash: false });
	}
}
function StopupdateFailure(response){
	alert("in failure");
	
}
function updatecancel(){
	$.mobile.changePage( "#startshift",{ changeHash: false });
	flag =1;
	$('#shiftupdate').show();
	$('#flip-min').val('on').slider("refresh");
	
}
//Start of Activity Handover - User Story 924135
function updactivityhandover(){       

	emp_id = $('#userid').text();
	//shiftupdates = prompt("Enter your Updates Please");
	shiftupdates= $("#updateshift").val();
	if(shiftupdates==''){
		alert("Please enter an update");
	}
	else{
		var invocationData = {
				adapter: "Validate",
				procedure: "stopupdate",
				parameters: [emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : shiftupdateSuccess,
	        onFailure : shiftupdateFailure,
	    });  
	}
}






function shiftupdateSuccess(response){
	var invocationResult = response.invocationResult;
	var allres = invocationResult.resultSet;
	

	if (allres.length > 0) {
		
		var invocationData = {
				adapter: "Validate",
				procedure: "updateshiftupdates",
				parameters: [shiftupdates,emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : completeShiftUpdatesSuccess,
	        onFailure : UpdateshiftPopupFailure,
	    });


	}

	else {	
		
		var invocationData = {

				adapter: "Validate",
				procedure: "insertshiftupdates",
				parameters: [emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : insertshiftUpdatesSuccess,
	        onFailure : insertshiftUpdatesFailure,
	    });	

		

	}

}

function insertshiftUpdatesSuccess(response){
	
	   emp_id = $('#userid').text();

		var invocationData = {
				adapter: "Validate",
				procedure: "updateshiftupdates",
				parameters: [shiftupdates, emp_id,currmonth]
		};
		WL.Client.invokeProcedure(invocationData,{
	        onSuccess : completeShiftUpdatesSuccess,
	        onFailure : completeShiftUpdatesFailure,
	    });
}




function shiftupdateFailure(response){
   alert("Failure in shift update");
}


function UpdateshiftPopupFailure(response){
   alert("Failure in UpdateshiftPopup");
}

function insertshiftUpdatesFailure(response){
   alert("Failure in InsertShift");
   }




function completeShiftUpdatesSuccess(response){
	$.mobile.changePage( "#startshift",{ changeHash: false });
   alert("Shift Updated Successfully");
}

function completeShiftUpdatesFailure(response){
   alert("Failure in complete Shift Updates Failure");
}

//End of Activity Handover - User Story 924135
function swapshiftSuccess(response){
	alert("in swap success");
}
function swapshiftFailure(response){
	alert("in swap failure");
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}