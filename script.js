let map, directionsService, directionsRenderer;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    const KotaSerang = {
        lat: -6.116605516593565,
        lng: 106.1522475529887
    };

    map = new google.maps.Map(document.getElementById('show-map'), {
        zoom: 15,
        center: KotaSerang,
        mapTypeControl: true,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: true,
        fullscreenControl: true,
    });

    directionsRenderer.setMap(map);
}

function calcRoute() {
    const start = document.getElementById('start').value.split(',');
    const end = document.getElementById('end').value.split(',');
    const mode = document.getElementById('mode').value;

    if (!start || !end || !mode) {
        alert('Silakan pilih lokasi awal, tujuan, dan mode transportasi.');
        return;
    }

    const request = {
        origin: new google.maps.LatLng(parseFloat(start[0]), parseFloat(start[1])),
        destination: new google.maps.LatLng(parseFloat(end[0]), parseFloat(end[1])),
        travelMode: google.maps.TravelMode[mode],
    };

    directionsService.route(request, function(result, status) {
        var harga = 1.3;
        if (status === 'OK') {

            directionsRenderer.setDirections(result);
            document.getElementById('distance').innerHTML = result.routes[0].legs[0].distance.text;
            document.getElementById('duration').innerHTML = result.routes[0].legs[0].duration.text;

            document.getElementById('price').innerHTML = 'Rp' + (result.routes[0].legs[0].distance.value * harga).toFixed(0);
            //document.getElementById('detail').classList.remove('hidden');
            document.getElementById('detail').style.display = 'block';
        } else {
            document.getElementById('detail').style.display = 'none';
            alert('Directions request failed due to ' + status);
        }
    });
}