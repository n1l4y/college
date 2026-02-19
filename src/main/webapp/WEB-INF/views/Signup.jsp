<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Signup</title>
</head>
<body>
	<h1>Signup</h1>
	<form method="post" action="signup" enctype="multipart/form-data">
		<table>
			<tr>
				<td>
					<label>Name:</label>
				</td>
				<td>
					<input type="text" name="name" />
					<p style="color: red;">${ error.getFieldError("name").getDefaultMessage() }</p>
				</td>
			</tr>
			<tr>
				<td>
					<label>Email:</label>
				</td>
				<td>
					<input type="email" name="email" />
					<p style="color: red;">${ error.getFieldError("email").getDefaultMessage() }</p>
				</td>
			</tr>
			<tr>
				<td>
					<label>Password:</label>
				</td>
				<td>
					<input type="password" name="password" />
					<p style="color: red;">${ error.getFieldError("password").getDefaultMessage() }</p>
				</td>
			</tr>
			<tr>
				<td>
					<label>Profile Pic:</label>
				</td>
				<td>
					<input type="file" name="pic" />
					<p style="color: red;">${ error.getFieldError("file").getDefaultMessage() }</p>
				</td>
			</tr>
			<tr>
			<td>
				<input type="submit" value="Signup" />
			</td>
			</tr>
		</table>
	</form>
</body>
</html>