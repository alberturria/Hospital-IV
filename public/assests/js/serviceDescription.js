$(document).ready(function(){
	loadServiceDescription();
});

function getQueryVariable() {
	var query = document.URL;
	var vars = query.split("=");
	return vars[1];
}

function loadServiceDescription(){
	var serviceId=getQueryVariable();

	fetch(`/services/${serviceId}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(fillBasicData);
		});

	fetch(`/services/${serviceId}/locations`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(fillServiceData);
		});

	fetch(`/services/${serviceId}/people`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(fillPersonData);
		});
}


function fillBasicData(service) {
	document.getElementById("serviceDescription").innerText= service.description;
	document.getElementById("serviceImage").src=service.image;
	document.getElementById("serviceTittle").innerHTML=service.name;
}

function fillServiceData(ids){
	fetch(`/locations/${ids.id_l}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(location) {
			document.getElementById("locationLinks").innerHTML+='<li><a href="locationDescription.html?location='+location[0].id+'">'+location[0].name+'</a></li>';
		});
}

function fillPersonData(ids){
	fetch(`/people/${ids.id_p}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(people) {
			document.getElementById("peopleLinks").innerHTML+='<li><a href="peopleProfile.html?people='+people[0].id+'">'+people[0].name+'</a></li>';
		});
}