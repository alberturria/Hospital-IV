$(document).ready(function(){
	loadEvents();
});

function loadEvents(){
	document.getElementById("myEvents").innerHtml="";

	fetch(`/events`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(addRow);
		});

}

function addRow(events) {
	let result="";
	result+='<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">';
	result+='<div class="tm-content-box">'
	result+='<a href="eventDescription.html?event='+events["id"]+'">';
	result+='<img src="../assests/img/'+events["img"]+'" alt="Image" class="tm-margin-b-20 img-fluid serviceImageIndex">'
	result+='<h4 class="textoIndice"><center>'+events["name"]+'</center></h4></a></div></div>';

	document.getElementById("myEvents").innerHTML+=result;
}