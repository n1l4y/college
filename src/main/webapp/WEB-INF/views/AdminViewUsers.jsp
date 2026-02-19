<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>View Users</title>
<style>
    canvas {
        display: block;
        margin: auto;
    }
</style>
</head>
<body>
	<div id="content-to-pdf" >
		<table border="1">
			
			<c:forEach var="user" items="${users }">
			
				<tr>
					<td>${user}</td>
				</tr>
				
			</c:forEach>
			
			</table>
			<div>
		  <canvas id="myChart"></canvas>
		</div>
		</div>
	<br />
	
	<button id="download-pdf">Download as PDF</button>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	
	<script>
	
	document.getElementById('download-pdf').addEventListener('click', () => {
        const element = document.getElementById('content-to-pdf');
        const options = {
            margin: 1,
            filename: 'output.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(options).from(element).save();
    });
	
const labels = [
	<c:forEach var="entry" items="${winRates}">
		"${entry[0]}",
	</c:forEach>
];
const winRates = [
	<c:forEach var="entry" items="${winRates}">
		${entry[1]},
	</c:forEach>
];

const ctx = document.getElementById('myChart');

new Chart(ctx, {
	type: 'bar',
	data: {
		labels: labels,
		datasets: [{
			label: 'WinRate %',
			data: winRates,
			backgroundColor: [
				'rgba(75, 192, 192, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(75, 192, 192, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1,
			borderRadius: 5, // Rounded corners
		}]
	},
	options: {
		indexAxis: 'y',
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'WinRate by User',
				font: {
					size: 18,
					family: 'Arial',
					weight: 'bold'
				},
				color: '#333'
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				titleColor: '#fff',
				bodyColor: '#fff',
				borderColor: '#fff',
				borderWidth: 1
			}
		},
		scales: {
			x: {
				ticks: {
					color: '#333',
					font: {
						size: 14
					}
				},
				grid: {
					color: 'rgba(200, 200, 200, 0.3)'
				}
			},
			y: {
				beginAtZero: true,
				ticks: {
					color: '#333',
					font: {
						size: 14
					}
				},
				grid: {
					color: 'rgba(200, 200, 200, 0.3)'
				}
			}
		}
	}
});
</script>

</body>
</html>