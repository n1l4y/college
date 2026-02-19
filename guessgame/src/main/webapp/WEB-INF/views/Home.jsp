<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home Page</title>
</head>
<body>
	<h1>Welcome ${user.getName()}</h1>
	<img src="${user.profilePath} " />
	<c:if test="${tx != null}">
		<c:choose>
			<c:when test="${tx.getResult() == 'WIN'}">
				<p style="color: blue;"> You Won! You guessed: ${tx.getGuess() } You now have ${user.getCredits()}</p>
			</c:when>
			
			
			<c:otherwise>
				<p style="color: red;"> You Lost! You guessed: ${tx.getGuess() } and the number was ${tx.getGeneratedNumber()} You now have ${user.getCredits()}</p>
			</c:otherwise>
		</c:choose>
	</c:if>
	<h2><a href='startgame'>Start Game</a></h2>
	<h2><a href="signout">Sign Out</a></h2>
	<h2><a href="leaderboard">View Leaderboard</a></h2>
	<h2><a href="addcredits">Buy credits</a></h2>
</body>
</html>