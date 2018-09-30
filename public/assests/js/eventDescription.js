$(document).ready(function(){
	loadEventDescription();
});

function getQueryVariable() {
	var query = document.URL;
	var vars = query.split("=");
	return vars[1];
}

function loadEventDescription(){
	var eventId = getQueryVariable();

	fetch(`/events/${eventId}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(loadEvent);
		});
}

function loadEvent(event) {
	document.getElementById("eventDescription").innerText= event.description;
	document.getElementById("eventImg").style.backgroundImage="url(../assests/img/"+event.img+")";
    document.getElementById("eventImg").style.backgroundSize="contain";
    document.getElementById("eventImg").style.backgroundRepeat="no-repeat";
    document.getElementById("eventImg").style.backgroundPosition="center";
    document.getElementById("eventTittle").innerHTML=event.name;
	document.getElementById("eventDate").innerHTML =convertDateFormat(event.date);

}

function convertDateFormat(string) {
	var mydate = new Date(string);
	var month = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"][mydate.getMonth()];
	return mydate.getDate() + ' ' + month + ' ' + mydate.getFullYear();
}