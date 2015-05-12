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
var currmonth = month[d.getMonth()]; 
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
	$('#shiftmanager').show();
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
		for(k=0;k<32;k++){
			if(k==0){
				var cell=row.insertCell(k);
				cell.innerHTML='Name';
			}
			else{
		var cell=row.insertCell(k);
		cell.innerHTML=currmonth+ ' '+k;
			}
	
			}
		
	for(i=0;i<length;i++){
		var row1=body.insertRow(i);
		var name = resultset[i].emp_name;
		var cell1=row1.insertCell(0);
		var cell2=row1.insertCell(1);
		var cell3=row1.insertCell(2);
		var cell4=row1.insertCell(3);
		var cell5=row1.insertCell(4);
		var cell6=row1.insertCell(5);
		var cell7=row1.insertCell(6);
		var cell8=row1.insertCell(7);
		var cell9=row1.insertCell(8);
		var cell10=row1.insertCell(9);
		var cell11=row1.insertCell(10);
		var cell12=row1.insertCell(11);
		var cell13=row1.insertCell(12);
		var cell14=row1.insertCell(13);
		var cell15=row1.insertCell(14);
		var cell16=row1.insertCell(15);
		var cell17=row1.insertCell(16);
		var cell18=row1.insertCell(17);
		var cell19=row1.insertCell(18);
		var cell20=row1.insertCell(19);
		var cell21=row1.insertCell(20);
		var cell22=row1.insertCell(21);
		var cell23=row1.insertCell(22);
		var cell24=row1.insertCell(23);
		var cell25=row1.insertCell(24);
		var cell26=row1.insertCell(25);
		var cell27=row1.insertCell(26);
		var cell28=row1.insertCell(27);
		var cell29=row1.insertCell(28);
		var cell30=row1.insertCell(29);
		var cell31=row1.insertCell(30);
		var cell32=row1.insertCell(31);
		cell1.innerHTML=name;
		cell1.setAttribute('id','emp_name');
		cell2.innerHTML=resultset[i].day1;
		cell3.innerHTML=resultset[i].day2;
		cell4.innerHTML=resultset[i].day3;
		cell5.innerHTML=resultset[i].day4;
		cell6.innerHTML=resultset[i].day5;
		cell7.innerHTML=resultset[i].day6;
		cell8.innerHTML=resultset[i].day7;
		cell9.innerHTML=resultset[i].day8;
		cell10.innerHTML=resultset[i].day9;
		cell11.innerHTML=resultset[i].day10;
		cell12.innerHTML=resultset[i].day11;
		cell13.innerHTML=resultset[i].day12;
		cell14.innerHTML=resultset[i].day13;
		cell15.innerHTML=resultset[i].day14;
		cell16.innerHTML=resultset[i].day15;
		cell17.innerHTML=resultset[i].day16;
		cell18.innerHTML=resultset[i].day17;
		cell19.innerHTML=resultset[i].day18;
		cell20.innerHTML=resultset[i].day19;
		cell21.innerHTML=resultset[i].day20;
		cell22.innerHTML=resultset[i].day21;
		cell23.innerHTML=resultset[i].day22;
		cell24.innerHTML=resultset[i].day23;
		cell25.innerHTML=resultset[i].day24;
		cell26.innerHTML=resultset[i].day25;
		cell27.innerHTML=resultset[i].day26;
		cell28.innerHTML=resultset[i].day27;
		cell29.innerHTML=resultset[i].day28;
		cell30.innerHTML=resultset[i].day29;
		cell31.innerHTML=resultset[i].day30;
		cell32.innerHTML=resultset[i].day31;
	}
	}
function teamchangeFailure(response)
{
	alert('falure');
	}