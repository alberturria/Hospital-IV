$(document).ready(function(){
	loadlocationDescription();
});

function getQueryVariable() {
	var query = document.URL;
	var vars = query.split("=");
	return vars[1];
}

function loadlocationDescription(){
	var city = getQueryVariable();

	fetch(`/locations/${city}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(addRow);
		});

	fetch(`/locations/${city}/services`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(writeServices);
		});
}

function addRow(location) {
	document.getElementById("locationDescription").innerText= location.description;
	document.getElementById("locationImg").src="../assests/img/"+location.img;
	document.getElementById("locationTittle").innerHTML=location.name;
}

function writeServices(idl){
	fetch(`/services/${idl.id_s}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(service) {
			document.getElementById("serviceLinks").innerHTML+='<li><a href="serviceDescription.html?service='+service[0].id+'">'+service[0].name+'</a></li>';
		});
}