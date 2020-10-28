var xhr = new XMLHttpRequest();
xhr.open("GET", "https://nominatim.openstreetmap.org/?format=json&polygon_geojson=1&addressdetails=1&q=Bayreuth+Germany", false);
xhr.send(null);
var bt = JSON.parse(xhr.responseText)[0]

var street_geojson_list = []

var streets = [
    "Alexanderstraße",
    "Am+Mainflecklein",
    "Am+Mühltürlein",
    "Am+Sendelbach",
    "Annecyplatz",
    "Badstraße",
    "Bahnhofstraße",
    "Bahnhofsvorplatz",
    "Brautgasse",
    "Dammallee",
    "Dammwäldchen",
    "Dilchertstraße",
    "Frauengasse",
    "Friedrichstraße",
    "Maximilianstraße",
    "Gerbergasse",
    "Gerberplatz",
    "Hohenzollernplatz",
    "Hohenzollernring",
    "Jahnstraße",
    "Jean-Paul-Platz",
    "Josephsplatz",
    "Kämmereigasse",
    "Kanalstraße",
    "Kanzleistraße",
    "Kirchgasse",
    "Kirchplatz",
    "La-Spezia-Platz",
    "Ludwigstraße",
    "Luitpoldplatz",
    "Münzgasse",
    "Opernplatz",
    "Opernstraße",
    "Parkhausstraße",
    "Prager+Platz",
    "Residenzplatz",
    "Richard-Wagner-Straße",
    "Schloßberglein",
    "Schulstraße",
    "Sophienstraße",
    "Spitalgasse",
    "Steingraeberpassage",
    "Sternplatz",
    "Von-Römer-Straße",
    "Wölfelstraße",
    "ZOH"
]

streets.forEach(function(street){
    xhr.open("GET", "https://nominatim.openstreetmap.org/?format=json&polygon_geojson=1&addressdetails=1&q="+street+"+Bayreuth+Germany", false);
    xhr.send(null);
    var response_list = JSON.parse(xhr.responseText)
    response_list.forEach(function(response){
        var street_geojson = {
            "id": response['place_id'],
                "type": "Feature",
                "geometry": response['geojson'],
                "properties": {
                    "name": street
                }
        }
        if(response['geojson']['type'] == 'LineString') {
            street_geojson_list.push(response['geojson'])
        }
    })
})


var mymap = L.map('mapid').setView([bt['lat'], bt['lon']], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: 'osm',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var myStyle = {
    "color": "red",
    "weight": 7,
    "opacity": .6
};

L.geoJSON(street_geojson_list, {style: myStyle}).addTo(mymap);