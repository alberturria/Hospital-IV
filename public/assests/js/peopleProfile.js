$(document).ready(function(){
	loadPeoplePage();
});


function getQueryVariable() {
	var query = document.URL;
	var vars = query.split("=");
	return vars[1];
}

function loadPeoplePage(){
	var id  = getQueryVariable();

	fetch(`/people/${id}`)
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		data.map(addBasicData);
	});

	fetch(`/people/${id}/services`)
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
	data.map(fillServiceData);
	});
}

function addBasicData(people) {
	document.getElementById("profilePicture").src="../assests/img/people/"+people.image;
	document.getElementById("description").innerText= people.description;
	document.getElementById("namePerson").innerText=people.name;
	document.getElementById("rolePerson").innerHTML="<h3><b>Role: </b><br>"+ people.role+"</h3>";
	document.getElementById("contactPerson").innerHTML="<h3><b>Contact: </b><br>"+people.email+"</h3>";
}

function fillServiceData(ids){
	fetch(`/services/${ids.id_s}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(services) {
			document.getElementById("service").innerHTML+='<li><a href="serviceDescription.html?service='+services[0].id+'">'+services[0].name+'</a></li>';
		});
}


