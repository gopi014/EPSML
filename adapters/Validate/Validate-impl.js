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
var x1 = "day"+new Date().getDate();
var x2=new Date().getDate();

var d = new Date();
if(d.getDay() == 1){
	var n= new Date(new Date().setDate(new Date().getDate()-3));
	var x=n.getDate();
	var currmonth = month[n.getMonth()]; 
	
}
else{
	var n=new Date(new Date().setDate(new Date().getDate()-1));
	var x=n.getDate();
	var currmonth = month[n.getMonth()];
}
var x3= "day"+x;
var procedure4Statement = WL.Server.createSQLStatement("select team, emp_id from user_team where emp_id=(select id from user_name where intranet_id=?)");
function validate(email) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure4Statement,
		parameters : [email]
	});
}
var procedureStatement = WL.Server.createSQLStatement("select * from user_name as na inner join user_team as te on na.id=te.emp_id inner join shift_schedule sh on te.emp_id= sh.emp_id where te.team= ? and sh.shift_month=?");
function smanager(teamname,currmonth) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedureStatement,
		parameters : [teamname,currmonth]
	});
}
var procedure3Statement = WL.Server.createSQLStatement("SELECT ut.team, un.emp_name, ss.* FROM shift_schedule ss, user_team ut, user_name un where ss.emp_id = ut.emp_id and ut.emp_id = un.id and ut.team = ? and ss.shift_month = ?");
function getUserShiftSchedule(team,month) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure3Statement,
		parameters : [team,month]
	});
}

var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name, st.end_time from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=? and ss.shift_month=?");
function getshiftstarttime(emp_id,currmonth) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure5Statement,
		parameters : [emp_id,currmonth]
	});
}



var procedure6Statement = WL.Server.createSQLStatement("UPDATE shift_actuals SET " + x1 + " = ? , availablity = 'Available' WHERE emp_id= ? and shift_month = ?");
function updateshiftactuals(shifthold,emp_id,month) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure6Statement,
		parameters : [shifthold, emp_id,month]
	});
}


var procedure7Statement = WL.Server.createSQLStatement("select * from shift_actuals where emp_id = ? and shift_month = ?");
function shiftactualsselect(emp_id,currmonth) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure7Statement,
		parameters : [emp_id,currmonth]
	});
}



var queryhold = "INSERT INTO shift_actuals(availablity, emp_id, shift_month, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31 ) VALUES ('Available', ? ,?, 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc')";

var procedure8Statement = WL.Server.createSQLStatement(queryhold);
function insertshiftactuals(emp_id, currmonth) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure8Statement,
		parameters : [emp_id, currmonth]
	});
}
var stopudaptequery=WL.Server.createSQLStatement("select "+x1+" from shift_update where emp_id=? and shift_month=?");
function stopupdate(emp_id,currmonth){
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : stopudaptequery,
		parameters : [emp_id,currmonth]
	});
}
var getuserstoptimequery=WL.Server.createSQLStatement("select st.end_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=? and ss.shift_month=?");
function getuserstoptime(emp_id,currmonth){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getuserstoptimequery,
		parameters : [emp_id,currmonth]
	});
	
}
var procedure10Statement = WL.Server.createSQLStatement("UPDATE shift_update SET " + x1 + " = ? WHERE emp_id= ? and shift_month = ?");
function updateshiftupdates(shiftupdates,emp_id,month) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure10Statement,
		parameters : [shiftupdates,emp_id,month]
	});
}

var queryhold1 = "INSERT INTO shift_update(emp_id, shift_month, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31 ) VALUES (? ,?, '', '', '', '', '','','','', '', '', '', '', '', '', '', '', '', '', '','','', '', '', '', '', '', '','', '', '', '')";
var procedure11Statement = WL.Server.createSQLStatement(queryhold1);
function insertshiftupdates(emp_id,currmonth) {

	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure11Statement,
		parameters : [emp_id,currmonth]
	});
} 

var getteammembersquery=WL.Server.createSQLStatement("SELECT un.emp_name FROM user_name un, user_team ut WHERE un.id = ut.emp_id AND ut.team = ? AND ut.emp_id != ? ");
function getmyteammembers(team,emp_id){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getteammembersquery,
		parameters : [team,emp_id]
	});
	
}
var queryforswap=WL.Server.createSQLStatement("select "+x1+" from shift_schedule where emp_id=(select id from user_name where emp_name=?) and shift_month = ?");
function swapingshift(emp_name,currmonth){
	return WL.Server.invokeSQLStatement({
		preparedStatement : queryforswap,
		parameters : [emp_name,currmonth]
	});
}
var swapupdateuser=WL.Server.createSQLStatement("UPDATE shift_schedule SET " + x1 + " = ? WHERE emp_id= ? and shift_month = ?");
function updatemyshift(shiftname,emp_id,currmonth){
	return WL.Server.invokeSQLStatement({
		preparedStatement : swapupdateuser,
		parameters : [shiftname,emp_id,currmonth]
	});
}
updateswapperson=WL.Server.createSQLStatement("UPDATE shift_schedule SET " + x1 + " = ? WHERE emp_id= (select id from user_name where emp_name=?) and shift_month = ?");
function swapmyshiftupdate(myshift,emp_name,currmonth){
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateswapperson,
		parameters : [myshift,emp_name,currmonth]
	});	
}
getemailidquery=WL.Server.createSQLStatement("select intranet_id from user_name where emp_name in (?) or id in (select emp_id from user_team where team in ('Manager'))");
function swapingshiftupdate(myshift,emp_name,emp_id,currmonth){
	var swapshift=swapingshift(emp_name,currmonth);
	var shiftname=swapshift.resultSet[0]['day'+x2];
	var updateshift= updatemyshift(shiftname,emp_id,currmonth);
		if(updateshift.isSuccessful==true){
		var swapmshift= swapmyshiftupdate(myshift,emp_name,currmonth);
		if(swapmshift.isSuccessful==true){
			
		
		return WL.Server.invokeSQLStatement({
			preparedStatement : getemailidquery,
			parameters : [emp_name]
		});
		}
	}
		else{
			return updateshift;
		}
}

var procedure2Statement = WL.Server.createSQLStatement("select * from user_team ut, shift_update su where ut.emp_id= su.emp_id and ut.team= ? and su.shift_month=?");
function procedure2(team,currmonth) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure2Statement,
		parameters : [team,currmonth]
	});
}

var getteamshiftquery = WL.Server.createSQLStatement("select ss.emp_id, ut.team, ss."+x1+", st.start_time from shift_schedule ss, user_team ut, shift_time st where ut.emp_id= ss.emp_id and ss."+x1+"= st.shift_name and ss.emp_id=st.emp_id and ut.team= ? and ss.shift_month=? ORDER BY st.start_time");
function procedure1(team,currmonth) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getteamshiftquery,
		parameters : [team,currmonth]
	});
}
var getpreviousupdatequery = WL.Server.createSQLStatement("select "+x1+ " from shift_update where shift_month=?  and emp_id=?");
function getshiftupdate(currmonth,emphold) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getpreviousupdatequery,
		parameters : [currmonth,emphold]
	});
}
var getprevdaylastshiftquery=WL.Server.createSQLStatement("select ss.emp_id, ut.team, ss.shift_month,ss."+x3+", st.start_time from shift_schedule ss, user_team ut, shift_time st where ut.emp_id= ss.emp_id and ss."+x3+"= st.shift_name and ss.emp_id=st.emp_id and ut.team= ? and ss.shift_month='"+currmonth+"' ORDER BY st.start_time DESC ");
function getprevdaylastshift(team){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getprevdaylastshiftquery,
		parameters : [team]
	});
	
}
var getshiftupdateprevquery = WL.Server.createSQLStatement("select su."+x3+ " from shift_schedule ss, user_team ut, shift_time st, shift_update su where ut.emp_id= ss.emp_id and ss.emp_id=st.emp_id and ss."+x3+"= st.shift_name and ss.emp_id= su.emp_id and ut.team=? and ss."+x3+"=? and su.shift_month='"+currmonth+"' ");
function getshiftupdateprev(team) {
	var prevdaylastshift=getprevdaylastshift(team);
	if(prevdaylastshift.isSuccessful==true){
		var prevshift=prevdaylastshift.resultSet[0]['day'+x];
		return WL.Server.invokeSQLStatement({
			preparedStatement : getshiftupdateprevquery,
			parameters : [team,prevshift]
		});
	}
	
}
var checkavailablityquery=WL.Server.createSQLStatement("select sa.availablity,st.start_time, st.shift_name from shift_actuals sa,shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=? and sa.shift_month=?");
function checkavailablity(emp_id,currmonth){
	return WL.Server.invokeSQLStatement({
		preparedStatement : checkavailablityquery,
		parameters : [emp_id,currmonth]
	});
}
var procedurestop =WL.Server.createSQLStatement("UPDATE shift_actuals SET availablity = 'Not Available' WHERE emp_id= ? and shift_month = ?");
function stopshiftavailablityupdate(emp_id,currmonth){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedurestop,
		parameters : [emp_id,currmonth]
	});
}
var procedure12Statement = WL.Server.createSQLStatement("select un.emp_name, ut.team from user_name un inner join user_team ut on un.id =ut.emp_id where un.id in (select emp_id from shift_actuals where availablity='Available') ");
function onshiftupdates(){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure12Statement,
		parameters : []
	});
}