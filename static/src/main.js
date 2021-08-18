'use strict';
var flag = false;

function initMap(){
    if (typeof(navigator.geolocation) != 'undefined') {
        navigator.geolocation.watchPosition(success, error);
    }
}

function success(position){
    var targetlat = 35.94292;
    var targetlng = 136.186513;
    var targetlatlng = new google.maps.LatLng(targetlat,targetlng);

    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat,lng);

    var map = new google.maps.Map(document.getElementById('map'),{
        center: latlng,
        zoom: 17,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl:false,
        styles: [{
            featureType: 'all',
            elementType: 'labels',
            stylers: [
                { visibility: 'off' }
            ]
        }]
    });

    var TargetMarker = new google.maps.Marker({
        map: map,
        position: targetlatlng,
    });

    var infoWindow = new google.maps.InfoWindow({
		content: 'めがね会館'
	});

	google.maps.event.addListener(TargetMarker, 'click', function() {
		infoWindow.open(map,TargetMarker);
	});

    var Marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon:{
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            rotation: -90,
            fillColor: '#7fbfff',
            fillOpacity: 0.7,
            strokeColor: '#000000',
            strokeWeight: 2 
        }
    });

    if(lat>targetlat){
        var maxlat = lat;
        var minlat = targetlat;
    } else {
        var maxlat = targetlat;
        var minlat = lat;
    }

    if(lng>targetlng){
        var maxlng = lng;
        var minlng = targetlng;
    }else{
        var maxlng = targetlng;
        var minlng = lng;
    }
    var sw = new google.maps.LatLng(maxlat,minlng);
    var ne = new google.maps.LatLng(minlat,maxlng);
    var bounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds,5);
    google.maps.event.addListener(map, 'click', event => clickListener(event, map));
    
    function clickListener(event, map) {
        let text = prompt('説明を入力して下さい','例:jig.jp');
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        
        var Marker = new google.maps.Marker({
            position: {lat, lng},
            map:map,
            icon:{
                url:'./img/star.png',
                scaledSize: new google.maps.Size(35,35)
            }
        });
        var infoWindow = new google.maps.InfoWindow({
            content: text + '<br>' + '<a href="" onclick="changeImg()">画像を変更する</a>'
        });
        google.maps.event.addListener(Marker, 'click', function() {
            if(flag==false){
                infoWindow.open(map,Marker);
            }else{
                Marker.setMap(null);
                flag = false;    
            }
        });
    }    
}
function error(e){
    alert("エラーが発生しました - " + e.message);
}

function onClick(){
    alert('削除するマーカーを選択してください');
    flag = true;
}

function changeImg(){

}