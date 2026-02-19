<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
</head>
<body>
	<h1>Login</h1>
	<p style="color: blue;">${message}</p>
	<p style="color: red;">${error}</p> 
	
	<form method="post" action="signin">
		<table>
			<tr>
				<td>Email: </td>
				<td> <input type="email" name="email" /> <p style="color: red;">${validationError.getFieldError("email").getDefaultMessage()}</p> </td> 
			</tr>
			<tr>
				<td>Password: </td>
				<td> <input type="password" name="password" /> <p style="color: red;">${validationError.getFieldError("password").getDefaultMessage()}</p> </td>
			</tr>
			<tr>
				<td><input type="submit" value="Signin" /></td>
			</tr>
		</table>
	</form>
	<a href="forgot">Forgot password</a>
</body>
</html>