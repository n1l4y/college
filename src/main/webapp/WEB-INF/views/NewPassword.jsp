<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reset Password</title>
</head>
<body>
	<h1>Reset Password</h1>
	<form method="post" action="updatepassword">
		<p> Enter OTP: </p>
		<input type="text" name="otp" /> <p style="color: red;"> ${otpError} </p><br />
		<p> New Password: </p>
		<input type="password" name="password1" /> <p style="color: red;"> ${error} </p><br />
		<p> Confirm Password: </p>
		<input type="password" name="password2" /> <p style="color: red;"> ${passError} </p> <br />
		<input type="hidden" name="email" value="${cookie.email.value}"/>
		<input type="submit" />
	</form>
</body>
</html>