function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//GLOBAL VARS    --------------------------------------------------------------------------
var points = [];  //array for points
var markers = [];     //array for markers
var map, date;

var beacon_id = [];
var beacon_target = [];
var beacon_target_latlng = [];

var locationData = [];

PNG_NORMAL = 'http://maps.google.com/mapfiles/kml/paddle/grn-circle-lv.png';
PNG_SELECTED = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
PNG_BEST = 'http://maps.google.com/mapfiles/kml/paddle/blu-stars.png';

//################## Google Map  ##########################################################
function deleteMarkers() {
    setMapOnAll(null);
    $('#data').empty();
    markers = [];
    points = [];
}


function beacon_delete() {
    $('#data').empty();
    markers = [];
    points = [];

    beacon_id = [];
    beacon_latlng = [];
    setMapOnMarkers(beacon_marker, null);

    beacon_target_latlng = [];
    beacon_target_b_id = [];

    beacon_best_id = [];
    beacon_best_latlng = [];
    setMapOnMarkers(beacon_best_markers, null);
}


function beacon_delete_target() {
    $('#data').empty();

    imax = beacon_target_latlng.length
    for (var i = 0; i < imax; i++) {
        latlng = beacon_target_latlng[i];
        jloc = $.inArray(latlng, beacon_latlng);
        beacon_marker[jloc].setIcon(PNG_NORMAL);
    };

    beacon_target_latlng = [];
    beacon_target_b_id = [];

    imax = beacon_best_latlng.length
    for (var i = 0; i < imax; i++) {
        latlng = beacon_best_latlng[i];
        jloc = $.inArray(latlng, beacon_latlng);
        beacon_marker[jloc].setIcon(PNG_NORMAL);
    };

    beacon_best_id = [];
    beacon_best_latlng = [];
    setMapOnMarkers(beacon_best_markers, null);
}


function beacon_delete_best() {
    $('#data').empty();

    imax = beacon_best_latlng.length
    for (var i = 0; i < imax; i++) {
        latlng = beacon_best_latlng[i];
        jloc = $.inArray(latlng, beacon_latlng);
        beacon_marker[jloc].setIcon(PNG_NORMAL);
    };

    beacon_best_id = [];
    beacon_best_latlng = [];
    setMapOnMarkers(beacon_best_markers, null);
}


function beacon_save_target() {
    $('#data').empty();

}




// Sets the map on all markers in the array.
function placeMarker(location, icon) {
    var marker = new google.maps.Marker({
        position: location,
        icon: icon,
        map: map
    });
    markers.push(marker);   //add marker to markers array
    points.push(location);  //add marker location to the array
}

function colorMarkers(color) { //No need use Google Map
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1
    };
}


// Deletes all markers in the array by removing references to them.
function setMapOnMarkers(markers, map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}



/*
  var styles = [
    // we will add the style rules here.
  ];
  var options = {
  mapTypeControlOptions: {
    mapTypeIds: ['Styled']
  },
    center: new google.maps.LatLng(-7.245217594087794, 112.74455556869509),
    zoom: 16,
    disableDefaultUI: true,
    mapTypeId: 'Styled'
  };
  var div = document.getElementById('surabaya');
  var map = new google.maps.Map(div, options);
  var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
  map.mapTypes.set('Styled', styledMapType);
};



*/

//Initialize array data for Heatmap




var Datas = [new google.maps.LatLng(35.689, 139.6917)];
var pointArray = new google.maps.MVCArray(Datas);

//######################################## GOOGLE MAP INIT #######################################################
function initMap() {
    //########################## Style
    //var styles = [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1 }] },
    //    { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1 }] },
    //    { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 }, { "gamma": 1 }] }];

    var styles = [
  {
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#f5f5f5"
        }
      ]
  },
  {
      "elementType": "labels.icon",
      "stylers": [
        {
            "visibility": "on"
        }
      ]
  },
  {
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#616161"
        }
      ]
  },
  {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
            "color": "#f5f5f5"
        }
      ]
  },
  {
      "featureType": "administrative.locality",
      "elementType": "labels.text",
      "stylers": [
        {
            "weight": 6.5
        }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#eeeeee"
        }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#757575"
        }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#e5e5e5"
        }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#9e9e9e"
        }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#ffffff"
        }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#757575"
        }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#dadada"
        }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#616161"
        }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#9e9e9e"
        }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#e5e5e5"
        }
      ]
  },
  {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#eeeeee"
        }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#c9c9c9"
        }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#9e9e9e"
        }
      ]
  }
    ];
    styles = [{
        stylers:
            [{ hue: "#8d919a" }, { saturation: -82 }, { lightness: 33 }]
    },
        { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#e8ebee" }] },
        { featureType: "poi", elementType: "geometry.fill", stylers: [{ color: "#d9dde3" }] }];

    var styledMapType = new google.maps.StyledMapType(styles, { name: '' });

    var options = {
        mapTypeControl: false,
        center: { lat: 35.6895, lng: 139.6917 },
        zoom: 16,
        //disableDefaultUI: true,
        mapTypeId: 'Styled'
    };

    map = new google.maps.Map(document.getElementById('map'), options);

    map.mapTypes.set('Styled', styledMapType);

    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    //add marker on click
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);


    //Load heatmap for first date
    pointArray = loadHeatmapMarkers();
    // pointArray = new google.maps.MVCArray(Datas);
    if (pointArray != undefined) {
        heatmap = new google.maps.visualization.HeatmapLayer({
            radius: localStorage.heatmapRadius,
            data: pointArray
        });
        heatmap.setMap(map);
    }
    //Find Maximum and Minimum Lat/Long And Update Location Table
    google.maps.event.addListener(map, 'idle', function () {
        //alert(map.getBounds());
        debugger
        var data = [];
        var bb = map.getBounds();
        var ne = bb.getNorthEast(); // top-left
        var sw = bb.getSouthWest(); // bottom-right

        //"min lat:" + ne.lat()
        //"max lat:" + sw.lat()
        //"min lng:" + sw.lng();
        //"max lng:" + ne.lng();

        $.each(locationData, function (index, value) {
            if (value[0] < ne.lat() && value[1] < ne.lng() && value[0] > sw.lat() && value[1] > sw.lng()) {
                data.push([value[1], value[0]])
            }
        });
        UpdateLocationTable(data);

    });

    //Change Heatmap with date
    $(document).on('click', 'ol.olTimeline li', function (e) {
        date = $(this).find("a").attr('data-date');
        deleteMarkers();

        //Load Icons
        $.each(JSON.parse(localStorage.locationData), function (index, value) {
            if (value.date == date) {
                placeMarker({ lat: value.lat, lng: value.long }, '../static/gg/map_js_css/map_icons/' + value.icon);
            }
        });

        //Load Heatmap
        var data = [];
        $.each(JSON.parse(localStorage.heatmapData), function (index, value) {
            if (value.date == date) {
                data.push([value.lat, value.long, value.intensity]);
            }
        });
        success(data);
    });



    /*  // Map is clickable everywhere
    google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(event.latLng);
    });
    */


    //##################   Auto Complete  ######################################################
    var autocomplete = new google.maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });


    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            $('#alert_place').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>No place found for <strong>' + place.name + '</strong> Click a place from the search dropdown</div>')
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);

        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);        
        if (radioButton != null) {
            radioButton.addEventListener('click', function () {
                autocomplete.setTypes(types);
            });
        }
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

    //document.getElementById('use-strict-bounds')
    //      .addEventListener('click', function () {
    //          console.log('Checkbox clicked! New state=' + this.checked);
    //          autocomplete.setOptions({ strictBounds: this.checked });
    //      });
}

//Change Location Table Data
function UpdateLocationTable(data) {    
    $('#tblLocation').find('tbody').html('');
    var locationRows = '';
    $.each(data, function (index, value) {
        locationRows += "<tr><td class='text-left'>" + date + "</td><td class='text-left'>" + value[1] + "</td><td class='text-left'>" + value[0] + "</td></tr>"
    });
    $('#tblLocation').find('tbody').append(locationRows);
    if (data.length <= 0)
    {
        $('#tblLocation').find('tbody').append("<tr><td class='text-left'></td><td class='text-left'></td><td class='text-left'></td></tr>");
    }
}

//Load Heatmap and Markers on initMap
function loadHeatmapMarkers() {
     
    var pointArray = [];
    if (localStorage.heatmapData != 'undefined') {
        date = JSON.parse(localStorage.heatmapData)[0].date;
        $.each(JSON.parse(localStorage.locationData), function (index, value) {
            if (value.date == date) {
                placeMarker({ lat: value.lat, lng: value.long }, '../static/gg/map_js_css/map_icons/' + value.icon);
            }
        });
        //Load Heatmap    
        locationData = [];
        $.each(JSON.parse(localStorage.heatmapData), function (index, value) {
            if (value.date == date) {
                locationData.push([value.lat, value.long, value.intensity]);
            }
        });
        for (var i = 0; i < locationData.length; i++) {
            pointArray.push({
                location: new google.maps.LatLng(locationData[i][0],
                                      locationData[i][1]), weight: locationData[i][2]
            });
        }
        getLatLngCenter(locationData);
        return pointArray;
    }
}

//Reset Heatmap Data
function success(data) {
    debugger
    while (Datas.length > 0) {
        Datas.pop();
    }

    pointArray = new google.maps.MVCArray(reboot(data));
    heatmap.setData(pointArray);
}

//Reinitialise Heatmap Data
function reboot(Ddatas) {
    var arraino = [];
    for (a in Ddatas) {
        arraino.push({
            location: new google.maps.LatLng(
                Ddatas[a][0],
                Ddatas[a][1]), weight: Ddatas[a][2]
        });
    }
    getLatLngCenter(Ddatas);
    locationData = Ddatas;
    return (arraino);
}

/**
    Center Location with Average Of Multiple Lat,Long
 */
function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

function getLatLngCenter(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i = 0; i < latLngInDegr.length; i++) {
        var lat = degr2rad(latLngInDegr[i][LATIDX]);
        var lng = degr2rad(latLngInDegr[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    //return ([rad2degr(lat), rad2degr(lng)]);

    map.setCenter({
        lat: rad2degr(lat),
        lng: rad2degr(lng)
    });      
}

function markerCoords(markerobject) {
    google.maps.event.addListener(markerobject, 'dragend', function (evt) {
        infoWindow.setOptions({
            content: '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>'
        });
        infoWindow.open(map, markerobject);
    });

    google.maps.event.addListener(markerobject, 'drag',
       function (evt) { console.log("marker is being dragged"); });
}
//#################################################################################################################################
//#################################################################################################################################




//################ USER ACTION   ##########################################################
// Get Best Beacon   -----------------------------------------------------------------
var beacon_best_markers = [];
var beacon_best_id = [];
var beacon_best_latlng = [];

function beacon_get_best() {
    var http = new XMLHttpRequest();
    var url = '/beacon_get_best/'
    var params = "points=" + JSON.stringify(beacon_target_b_id);
    http.open("POST", url, true); http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); http.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));

    //Call a function when the state changes.
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            obj = JSON.parse(http.responseText);
            json_beacon = obj['json_beacon'];
            beacon_delete_best();

            // HTML table showing the points  --------------------------------------------------
            // ['b_id', 'shop_name', 'address', 'postal'    ],
            $('#data').empty();   // Table HTML "data"
            imax = json_beacon.features.length;
            for (var i = 0; i < imax; i++) {
                row = '<tr><td>' + json_beacon.features[i].geometry.coordinates[1] + '</td><td>' + json_beacon.features[i].geometry.coordinates[0];
                row += '</td><td>' + json_beacon.features[i].properties.postal + '</td>        </tr>';
                $('#data').append(row);
            }
            // $('#data').append('<tr><td>'+json_beacon.features[i].geometry.coordinates[1]+'</td><td>'+json_beacon.features[i].geometry.coordinates[0]+'</td><td>'+json_beacon.features[i].properties.postal+'</td>        </tr>');
            $('#data').append('<th colspan="3">Inputs</th><tr><td></td></tr>');


            //Print into Front End Map   ------------------------------------------------------
            imax = json_beacon.features.length;
            for (var i = 0; i < imax; i++) {
                lat = json_beacon.features[i].geometry.coordinates[1]; lng = json_beacon.features[i].geometry.coordinates[0];
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                    icon: PNG_BEST,
                    label: 'Best Assist Beacon',   //json_beacon.features[i].properties.b_id   //Beacon ID
                    title: 'Best Assist Beacon',
                    Content: 'Best Assist Beacon'

                });
                beacon_best_markers.push(marker);
                beacon_best_id.push(json_beacon.features[i].properties.b_id);
                beacon_best_latlng.push(lat.toFixed(6) + ',' + lng.toFixed(6));

            }
        }
    }
    http.send(params);
}


beacon_target_latlng = [];
beacon_target_b_id = [];
function beacon_target_add(event) {
    //  Add Target Beacon
    // b_id= event.label()
    lat = event.latLng.lat(); lng = event.latLng.lng()
    latlng = lat.toFixed(6) + "," + lng.toFixed(6)

    iloc = $.inArray(latlng, beacon_target_latlng)
    if (iloc > -1) {  // inside, Back to normal
        this.setIcon(PNG_NORMAL);

        beacon_target_b_id.splice(iloc, 1);
        beacon_target_latlng.splice(iloc, 1);
        //beacon_target_latlng.splice(iloc,1);
    }
    else {            // Not inside, Create one
        jloc = $.inArray(latlng, beacon_latlng)  //Find in Big List
        beacon_target_b_id.push(beacon_id[jloc]);
        beacon_target_latlng.push(latlng);
        //beacon_target_latlng( event.latLng );
        //this.setIcon(PNG_SELECTED)
        beacon_marker[jloc].setIcon(PNG_SELECTED)
    }
};


//-----------------------------------------------------------------------------
beacon_latlng = [];
beacon_marker = [];
beacon_id = [];
function beacon_show() {
    // Show beacons on the map
    // alert("beacon_show");
    beacon_delete();
    var http = new XMLHttpRequest();
    var url = '/beacon_show/'
    var params = "area=0"   // +JSON.stringify(points);
    http.open("POST", url, true); http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); http.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    // alert("beacon_show 2");

    //Call a function when the state changes.
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            // alert("beacon_show 200");
            obj = JSON.parse(http.responseText);
            json_beacon = obj['json_beacon']  // JSON.parse(obj.json_beacon)  // obj['json_beacon']

            //Print into Front End Map   ------------------------------------------------------
            imax = json_beacon.features.length;
            // alert(  json_beacon.features[0].geometry.coordinates[1]  )
            for (var i = 0; i < imax; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(json_beacon.features[i].geometry.coordinates[1], json_beacon.features[i].geometry.coordinates[0]),
                    map: map,
                    icon: PNG_NORMAL,
                    // label: json_beacon.features[i].properties.b_id+'',   //Beacon ID
                    // Google http://kml4earth.appspot.com/icons.html
                    // content : ''
                });

                beacon_id.push(json_beacon.features[i].properties.b_id)
                beacon_latlng.push(json_beacon.features[i].geometry.coordinates[1].toFixed(6) + ',' + json_beacon.features[i].geometry.coordinates[0].toFixed(6))

                marker.addListener('click', beacon_target_add);
                beacon_marker.push(marker);
                //             points.push(new google.maps.LatLng(  json_beacon.features[i].geometry.coordinates[1], json_beacon.features[i].geometry.coordinates[0]  ));
            }
        }
    }
    http.send(params);
}





/*

https://snazzymaps.com/explore?text=&sort=popular&tag=&color=


https://developers.google.com/maps/documentation/javascript/events

https://developers.google.com/maps/documentation/javascript/reference#MouseEvent

http://api.jquery.com/jquery.inarray/


#https://snazzymaps.com/style/134/light-dream


[{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]

http://kml4earth.appspot.com/icons.html



a= _.isEqual([1,2,3], [1,2,3]);

35.658050,139.700940

          // HTML table showing the points  --------------------------------------------------
          // ['b_id', 'shop_name', 'address', 'postal'    ],
          /*
          $('#data').empty();   // Table HTML "data"
          jmax= json_beacon.features.length;
          for (var i=0; i<jmax; i++)
          {  $('#data').append('<tr><td>'+json_beacon.features[i].properties.b_id+'</td><td>'+json_beacon.features[i].shop_name+'</td><td>'+json_beacon.features[i].properties.address+'</td>        </tr>');
          }
          $('#data').append('<th colspan="3">Inputs</th><tr><td></td></tr>');





Google Map :
http://software.stadtwerk.org/google_maps_colorizr/



Photoshop ----> CSS (color,  select)

CSS ---> Select of Colors / design



{
  featureType: 'poi',
  elementType: 'geometry',
  stylers: [
    { hue: '#f9e0b7' },
    { lightness: 30 }
  ]
},{
  featureType: 'road',
  elementType: 'geometry',
  stylers: [
    { hue: '#d5c18c' },
    { lightness: 14 }
  ]
},{
  featureType: 'road.local',
  elementType: 'all',
  stylers: [
    { hue: '#ffd7a6' },
    { saturation: 100 },
    { lightness: -12 }
  ]
}



*/



/*
http://www.jquerybyexample.net/2012/02/remove-item-from-array-using-jquery.html


jQuery.inArray( value, array [, fromIndex ] )


ar marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zoom:25,
        title: title,
        draggable:true,
});
var infowindow = new google.maps.InfoWindow({
    content: info
  });
infowindow.open(map,marker);

google.maps.event.addListener(marker,'drag',function(event) {
    document.getElementById('lat').value = event.latLng.lat();
    document.getElementById('lng').value = event.latLng.lng();
    var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + event.latLng.lat() + '<br>Longitude: ' + event.latLng.lng()
      });
    infowindow.open(map,marker);
});

google.maps.event.addListener(marker,'dragend',function(event)
        {
    document.getElementById('lat').value =event.latLng.lat();
    document.getElementById('lng').value =event.latLng.lng();
    var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + event.latLng.lat() + '<br>Longitude:'+`event.latLng.lng()
      });
    infowindow.open(map,marker);
});



marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

 marker.addListener('drag', handleEvent);



          for (i; i<j;i++)
          {
            $('#data').append('<tr><td>'+gjson.features[i].geometry.coordinates[1]+'</td><td>'+gjson.features[i].geometry.coordinates[0]+'</td><td>'+gjson.features[i].properties.address+'</td>        </tr>');
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(gjson.features[i].geometry.coordinates[1], gjson.features[i].geometry.coordinates[0]),
                map: map,
                icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            });
            markers.push(marker);
            points.push(new google.maps.LatLng(gjson.features[i].geometry.coordinates[1], gjson.features[i].geometry.coordinates[0]));
          }

*/


/*
{'geometry': {'type': 'Point', 'coordinates': [139.69707, 35.689040000000006]}, 'type': 'Feature', 'properties':
{'website': '', 'shop_name': '', 'postal': '', 'b_id': 16056L, 'address': ''}}, {'geometry': {'type': 'Point', 'coordinates': [135.54946999999999, 34.686209999999996]}, '
type': 'Feature', 'properties': {'website': '', 'shop_name': '', 'postal': '', 'b_id': 16057L, 'address': ''}}, {'geometry': {'type': 'Point', 'coordinates': [135.5607, 3
4.7418]}, 'type': 'Feature', 'properties': {'website': '', 'shop_name': '', 'postal': '', 'b_id': 16058L, 'address': ''}}]}
[12/Mar/2017 16:25:41] "POST /beacon_show/ HTTP/1.1" 200 2863001


https://www.dataquest.io/blog/python-json-tutorial/


GET http://35.187.217.100/beacon_show

 -- response --
200 OK
Date:  Sun, 12 Mar 2017 17:24:07 GMT
Server:  WSGIServer/0.1 Python/2.7.13
X-Frame-Options:  SAMEORIGIN
Content-Type:  application/json

{"
{
	"json_beacon": {
		"type": "FeatureCollection",
		"features": [
		    {
				"geometry": {
					"type": "Point",
					"coordinates": [139.61977,	35.749320000000004]
				},
				"type": "Feature",
				"properties": {
					"website": "","shop_name": "","postal": "","b_id": 83,"address": ""
				}
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						139.73927,
						35.66531
					]
				},
				"type": "Feature",
				"properties": {
					"website": "",
					"shop_name": "",
					"postal": "",
					"b_id": 84,
					"address": ""
				}
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						139.7375,
						35.683859999999996
					]
				},
				"type": "Feature",
				"properties": {
					"website": "",
					"shop_name": "",
					"postal": "",
					"b_id": 88,
					"address": ""
				}
			}
		]
	}
}

*/






function send_points() {
    var http = new XMLHttpRequest();
    var url = '/getpoints/'

    var params = "points=" + JSON.stringify(points);
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            deleteMarkers()
            obj = JSON.parse(http.responseText);

            gjson = JSON.parse(obj.near_points);
            inputs = JSON.parse(obj.inputs);

            $('#data').empty();

            // HTML table showing the points  --------------------------------------------------
            var i = 0;
            jmax = gjson.features.length;
            for (i; i < jmax ; i++) {
                $('#data').append('<tr><td>' + gjson.features[i].geometry.coordinates[1] + '</td><td>' + gjson.features[i].geometry.coordinates[0] + '</td><td>' + gjson.features[i].properties.address + '</td>        </tr>');
            }
            $('#data').append('<th colspan="3">Inputs</th><tr><td></td></tr>');

            //Loop on the contents   -----------------------------------------------------------
            i = 0;
            imax = inputs.length;
            for (i; i < imax; i++) {
                $('#data').append('<tr><td>' + inputs[i].PointList.lat + '</td><td>' + inputs[i].PointList.lng + '</td><td>' + inputs[i].PointList.address + '</td>       </tr>');
            }

            //Print into Front End Map   ------------------------------------------------------
            i = 0;
            for (i; i < imax; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(inputs[i].PointList.lat, inputs[i].PointList.lng),
                    map: map
                });
                markers.push(marker);
                points.push(new google.maps.LatLng(inputs[i].PointList.lat, inputs[i].PointList.lng));
            }
        }
    }
    http.send(params);

}






function insert_points() {
    alert("beacon_show");
    var http = new XMLHttpRequest();
    var url = '/insertpoints/'
    var params = "points=" + JSON.stringify(points);
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            $('#alert_place').html('<div class="alert alert-success alert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>kkk  Markers Inserted</div>');
        }
        else if (http.status == 500) {
            $('#alert_place').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>An error occured, try to reduce number of points</div>');
        }
    }
    http.send(params);
}



/*
    function send_points(){
      var http = new XMLHttpRequest();
      var url = '/getpoints/'
      var params = "points="+JSON.stringify(points);
      http.open("POST", url, true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          deleteMarkers()
          obj=JSON.parse(http.responseText);
          gjson=JSON.parse(obj.near_points);
          inputs=JSON.parse(obj.inputs);
          $('#data').empty();
          var i=0;
          j=gjson.features.length;
          for (i; i<j;i++)
          {
            $('#data').append('<tr><td>'+gjson.features[i].geometry.coordinates[1]+'</td><td>'+gjson.features[i].geometry.coordinates[0]+'</td><td>'+gjson.features[i].properties.address+'</td>        </tr>');
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(gjson.features[i].geometry.coordinates[1], gjson.features[i].geometry.coordinates[0]),
                map: map,
                icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            });
            markers.push(marker);
            points.push(new google.maps.LatLng(gjson.features[i].geometry.coordinates[1], gjson.features[i].geometry.coordinates[0]));
          }
          $('#data').append('<th colspan="3">Inputs</th>');
          i=0;
          j=inputs.length;
          for (i; i<j;i++)
          {
            $('#data').append('<tr><td>'+inputs[i].PointList.lat+'</td><td>'+inputs[i].PointList.lng+'</td><td>'+inputs[i].PointList.address+'</td>       </tr>');
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(inputs[i].PointList.lat, inputs[i].PointList.lng),
                map: map
            });
            markers.push(marker);
            points.push(new google.maps.LatLng(inputs[i].PointList.lat, inputs[i].PointList.lng));
          }
        }
    }
    http.send(params);
    }

*/
