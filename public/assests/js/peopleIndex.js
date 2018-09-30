$(document).ready(function(){
		fetch(`/people/numberPeople`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			loadPeoplePage(1, Math.ceil(data/6));
		});
});

function loadPeoplePage(index, nPages){
	contentIndexSelected(index);

	document.getElementById("indexPeopleNumber").innerHTML=chooseIndexSelected(index, nPages);
}

function chooseIndexSelected(number, nPages){
	var result="";

	for (var i=1; i<=nPages ; i++) {
		result += '<a id="index'+i+'" ';
		if (i==number)
			result += 'class="selectedIndex"';
		else
			result += 'class="normalIndex"';

		result += ' href="#indexPeopleContent" onclick="loadPeoplePage('+i+','+nPages+');">'+i+'</a>';
	}

	return result;
}

function contentIndexSelected(number){
	document.getElementById("indexPeopleContent").innerHTML="";
	
	fetch(`/people?start=${(number-1)*6}?&sort=name`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.map(fillPerson);
		});
}

function fillPerson(person){
	document.getElementById("indexPeopleContent").innerHTML+='<div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"><div class="tm-content-box tm-margin-b-40">'+
	'<a href="peopleProfile.html?people='+person.id+'"><div class="photoPersonal" style="background-image: url('+"'../assests/img/people/"+person.image+"')"+'"></div>'+
	'<h4 class="tm-gold-text">'+person.name+'</h4>'+
	'<p style="color: grey;">'+person.role+'</p></a></div></div>';
}