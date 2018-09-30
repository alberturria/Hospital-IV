function initMap() {
    var milano = {lat: 45.477987, lng: 9.226353};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: milano
    });
    var marker = new google.maps.Marker({
    position: milano,
    map: map
    });
}