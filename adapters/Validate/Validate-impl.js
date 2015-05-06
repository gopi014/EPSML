var procedure1Statement = WL.Server.createSQLStatement("select team from user_team where emp_id=(select id from user_name where intranet_id=?)");
function validate(email) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [email]
	});
}
