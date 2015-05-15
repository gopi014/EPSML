var procedure1Statement = WL.Server.createSQLStatement("select team from user_team where emp_id=(select id from user_name where intranet_id=?)");
function validate(email) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
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
