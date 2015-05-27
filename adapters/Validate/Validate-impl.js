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



var d = new Date().getDate();
switch(d) 
{
case 1: 	
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day1 =st.shift_name and ss.emp_id=?");
	break;
case 2:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day2 =st.shift_name and ss.emp_id=?");
	break;
case 3:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day3 =st.shift_name and ss.emp_id=?");
	break;
case 4:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day4 =st.shift_name and ss.emp_id=?");
	break;
case 5:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day5 =st.shift_name and ss.emp_id=?");
	break;
case 6:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day6 =st.shift_name and ss.emp_id=?");
	break;
case 7:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day7 =st.shift_name and ss.emp_id=?");
	break;
case 8:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day8 =st.shift_name and ss.emp_id=?");
	break;
case 9:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day9 =st.shift_name and ss.emp_id=?");
	break;
case 10:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day10 =st.shift_name and ss.emp_id=?");
	break;
case 11:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day11 =st.shift_name and ss.emp_id=?");
	break;
case 12:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day12 =st.shift_name and ss.emp_id=?");
	break;
case 13:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day13 =st.shift_name and ss.emp_id=?");
	break;
case 14:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day14 =st.shift_name and ss.emp_id=?");
	break;
case 15:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day15 =st.shift_name and ss.emp_id=?");
	break;
case 16:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day16 =st.shift_name and ss.emp_id=?");
	break;
case 17:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day17 =st.shift_name and ss.emp_id=?");
	break;
case 18:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day18 =st.shift_name and ss.emp_id=?");
	break;
case 19:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day19 =st.shift_name and ss.emp_id=?");
	break;
case 20:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day20 =st.shift_name and ss.emp_id=?");
	break;
case 21:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day21 =st.shift_name and ss.emp_id=?");
	break;
case 22:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day22 =st.shift_name and ss.emp_id=?");
	break;
case 23:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day23 =st.shift_name and ss.emp_id=?");
	break;
case 24:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day24 =st.shift_name and ss.emp_id=?");
	break;
case 25:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day25 =st.shift_name and ss.emp_id=?");
    break;

case 26:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day26 =st.shift_name and ss.emp_id=?");
    break;
case 27:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day27 =st.shift_name and ss.emp_id=?");
	break;
case 28:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day28 =st.shift_name and ss.emp_id=?");
    break;
case 29:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day29 =st.shift_name and ss.emp_id=?");
	break;
case 30:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day30 =st.shift_name and ss.emp_id=?");
    break;
case 31:
	var procedure5Statement = WL.Server.createSQLStatement("select st.start_time, st.shift_name from shift_schedule ss, shift_time st where ss.emp_id= st.emp_id and ss.day31 =st.shift_name and ss.emp_id=?");
	break;
}

function getshiftstarttime(emp_id) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure5Statement,
		parameters : [emp_id]
	});
}


var x1 = "day"+new Date().getDate();
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