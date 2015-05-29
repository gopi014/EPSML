var x1 = "day"+new Date().getDate();
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

var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=?");

function getshiftstarttime(emp_id) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure5Statement,
		parameters : [emp_id]
	});
}



var procedure6Statement = WL.Server.createSQLStatement("UPDATE shift_actuals SET " + x1 + " = ? WHERE emp_id= ? and shift_month = ?");
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



var queryhold = "INSERT INTO shift_actuals(emp_id, shift_month, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31 ) VALUES (? ,?, 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc', 'NonDesc','NonDesc', 'NonDesc', 'NonDesc', 'NonDesc')";

var procedure8Statement = WL.Server.createSQLStatement(queryhold);
function insertshiftactuals(emp_id, currmonth) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure8Statement,
		parameters : [emp_id, currmonth]
	});
}
var stopudaptequery=WL.Server.createSQLStatement("select "+x1+" from shift_update where emp_id=?");
function stopupdate(emp_id){
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : stopudaptequery,
		parameters : [emp_id]
	});
}
var getuserstoptimequery=WL.Server.createSQLStatement("select st.end_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss."+x1+" =st.shift_name and ss.emp_id=?");
function getuserstoptime(emp_id){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getuserstoptimequery,
		parameters : [emp_id]
	});
	
}