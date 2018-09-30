$(document).ready(function(){
	loadNews();
});

function loadNews(){
	document.getElementById("myNews").innerHtml="";

	fetch(`/news?sort=-date`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(addRow);
		});

}

function addRow(news) {
	let result="";
	result += '<div class="wrapNew col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">';
	result += '<img class="imageNew" src="../assests/img/'+news["img"]+'">';
    result += '<div class="contentNew">';
    result += '<div class="dateNew">';
    result += convertDateFormat(news["date"]);
    result += '</div>';
    result += '<div class="titleNew">';
    result += news["tittle"];
    result += '</div><div class="bodyNew">';
    result += news["body"];
    result += '</div></div>';
   
	document.getElementById("myNews").innerHTML+=result;
}

function convertDateFormat(string) {
	var mydate = new Date(string);
	var month = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"][mydate.getMonth()];
	return mydate.getDate() + ' ' + month + ' ' + mydate.getFullYear();
}