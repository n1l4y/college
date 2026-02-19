<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reset Password</title>
</head>
<body>
	<h1>Enter email address to reset password</h1>
	<form action="reset" method="post">
		<label>Enter Email:</label> <br />
		<input type="email" name="email" /> <p style="color: red;">${error}</p> <br />
		<input type="submit" value="Reset" />
	</form>
</body>
</html>