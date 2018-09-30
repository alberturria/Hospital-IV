$(document).ready(function(){
	loadLocations();
});

function loadLocations(){
	document.getElementById("myLocations").innerHtml="";
	fetch(`/locations`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
            data.map(addRow);
        });
}

function addRow(locations) {
	let result="";
	result+='<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">';
	result+='<div class="tm-content-box">'
	result+='<a href="locationDescription.html?location='+locations["id"]+'">';
	result+='<img src="../assests/img/'+locations["img"]+'" alt="Image" class="tm-margin-b-20 img-fluid serviceImageIndex">';
	result+='<h4 class="textoIndice"><center>'+locations["name"]+'</center></h4></a></div></div>';

	document.getElementById("myLocations").innerHTML+=result;
}