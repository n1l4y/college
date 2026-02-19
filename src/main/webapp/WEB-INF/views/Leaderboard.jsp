<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Leaderboard</title>
</head>
<body>
	<h1>Leaderboard</h1>
	<table border="1">
	<tr>
            <th>Position</th>
            <th>Name</th>
            <th>Win ratio</th>
        </tr>
	<c:forEach var="obj" items="${leaderboard }" varStatus="status">
		<tr>
            <td>${status.index + 1}</td> 
            <td>${obj[0]}</td>
            <td>${obj[1]}</td>
        </tr>
	
	</c:forEach>
	</table>
	<h3><a href="home">Home</a></h3>
</body>
</html>