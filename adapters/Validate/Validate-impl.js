var procedure1Statement = WL.Server.createSQLStatement("select  emp_name,team from team_user_team WHERE intranet_id=?");
function validate(email) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [email]
	});
}
