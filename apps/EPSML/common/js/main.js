var busyIndicator;
var busy;
var summ=[];
var connectstatus;
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
	var date=$("#widate"+par).text();
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
	$('#AppBody').hide();
	$.mobile.changePage( "#wfhleave",{ changeHash: false });	
}
function leaveFailure(response){
	
	alert("Faliure");
}
function teamchange(){
	WL.ClientMessages.loading = "Loading!Please wait...";
	busy = new WL.BusyIndicator ();
	var teamname = document.getElementById("select-custom-20").value;
	var tablesize=$('#emp_name tr').length;
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
		$('#emp_name tr').remove();
		$('#emp_data tr').remove();
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
			var name = resultset[k-1].emp_name;
			var nameRow = tableName.insertRow(k);
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
			for(var j=0;j<(32-currday);j++){
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
	$.mobile.changePage( "#startshift",{ changeHash: false });
}
