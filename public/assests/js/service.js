
$(document).ready(function(){
	loadServices();
});

function loadServices(){
	document.getElementById("services").innerHTML=''
	document.getElementById("services").innerHtml="";

	fetch(`/services`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(addRow);
		});
}

function addRow(services) {
	let result="";
	result += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">'+
			'<div class="tm-margin-b-30 tm-content-box">'+
				'<a href="serviceDescription.html?service='+services["id"]+'">'+
					'<img src="'+services["image"]+'" alt="Image" class="tm-margin-b-20 img-fluid serviceImageIndex">'+
					'<h4 class="textoIndice"><center>'+services["name"]+'</center></h4>'+
				'</a>'+
				'<p>'+services["description"]+'</p>'+
			'</div>'+
		'</div>';
   
	document.getElementById("services").innerHTML+=result;
}




function serviceByLocation() {
	document.getElementById("services").innerHTML=''
	var locationId;

	if (document.getElementById("milano").checked)
		locationId = 1
	else if (document.getElementById("bologna").checked)
		locationId = 2;
	else if (document.getElementById("rome").checked)
		locationId = 4;
	else if (document.getElementById("naples").checked)
		locationId = 3;
		
	fetch(`/locations/${locationId}/services`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(ServicesByLocation2);
		});
}

function ServicesByLocation2(idl){
		fetch(`/services/${idl.id_s}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(services) {

document.getElementById("services").innerHTML+='<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">'+
				'<div class="tm-margin-b-30 tm-content-box">'+
					'<a href="serviceDescription.html?service='+services[0].id+'">'+
						'<img src="'+services[0].image+'" alt="Image" class="tm-margin-b-20 img-fluid serviceImageIndex">'+
						'<h4 class="textoIndice"><center>'+services[0].name+'</center></h4>'+
					'</a>'+
					'<p>'+services[0].description+'</p>'+
				'</div>'+
			'</div>';
		});

}
