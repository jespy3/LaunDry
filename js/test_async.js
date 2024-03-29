async function test_guessAddress(usertext) {
    var mapsapikey = "key=AIzaSyAXAnWVJ3Zjo0lwBw-6fKzvO-w7--W7_U4";
    var baseUri = "https://maps.googleapis.com/maps/api/place/";
    var autocomplete = "autocomplete/";
    var latlong = "location=-36.849998,174.783325";  // Lat & long for Auckland taken from the city.list.json file
    var components = "components=country:nz";
    var radius = "radius=200000"; // 200,000 metres / 200 kilometres
    var types = "types=address";
    var input = "input=" + usertext;

    var autocompleteUri = baseUri + autocomplete + "json?" + mapsapikey + "&" + latlong + "&" + components
     + "&" + radius + "&" + types + "&" + input;

    console.log(autocompleteUri);
    /* var lookupResults;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", autocompleteUri, true);
    xhr.onload = function () {
        lookupResults = JSON.parse(xhr.responseText);
        //results = JSON.parse(xhr.responseText);
        //console.log(results);
        // return lookupResults.predictions[0];
        //console.log(JSON.stringify(lookupResults))
        var location = getAddressLocation(lookupResults.predictions[0]); 
        // latitude is under .lat, longitude is under .lng
        return location;
    }
    xhr.send(null); */

    //console.log(JSON.stringify(lookupResults));

    /* var lookupresults = fetch(autocompleteUri).then(resolve).then(jsonify)
        .catch(e => console.log('Fetch error:', err));
    console.log(lookupresults);
    return lookupresults.predictions[0];  */   
    var b = await fetch(autocompleteUri).then(resolve).then(jsonify)
        .then(resp => {return resp.predictions[0]});
    /* var b = await fetch(autocompleteUri).then(resolve).then(r => {return r.json()})
        .catch(e => console.log('Fetch error:', err));
        console.log(b); */

    return b;
    //console.log(lookupresults);
    //return lookupresults.predictions[0]; 
}

async function test_lookupAddressLocation(myaddress) {
    
    var prediction = await test_guessAddress(myaddress);
    var location = await test_getAddressLocation(prediction);
    console.log(location);
    return location;
}

async function test_getWeatherForecastFromAddress(userAddress) {
    var addressLocation = await test_lookupAddressLocation(userAddress);
    var weatherForcecast = test_getWeatherData(addressLocation.lat, addressLocation.lng);
}

async function test_getWeatherData(lat, long) {
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?lat=" + lat + "&lon=" + long + "&mode=json&APPID=" + apikey;

    /* var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);
        return forecastdata        
    }
    xhr.send(null); */

    var weatherForcecast = await fetch(fulluri).then(resolve).then(jsonify).then(logger)
        .then(resp => {return resp});

    //console.log(weatherForcecast);

    //return weatherForcecast;
}

async function test_getAddressLocation(prediction) {
    var placeID = prediction.place_id;
    var mapsapikey = "key=AIzaSyAXAnWVJ3Zjo0lwBw-6fKzvO-w7--W7_U4";
    var baseUri = "https://maps.googleapis.com/maps/api/place/";
    var detailsUri = baseUri + "details/json?" + "placeid=" + placeID + "&" + mapsapikey ;

    console.log(detailsUri);

    /* console.log(detailsUri);
    var lookupResults;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", detailsUri, true);
    xhr.onload = function () {
        //lookupResults = JSON.parse(xhr.responseText);
        results = JSON.parse(xhr.responseText);
        console.log(results);
        var locat = results.result.geometry.location;
        console.log(JSON.stringify(locat));
    
        return locat;
    }
    xhr.send(null); */

    var lookupResults = await fetch(detailsUri).then(resolve).then(jsonify)
        .then(resp => {return resp.result.geometry.location});
        console.log(lookupResults);
    //var locat = lookupResults.result.geometry.location;
    //console.log(locat)
    //return locat;
    return lookupResults;
}

function test_integration() {
    var address = "6 Egremont St";
    var result = test_getWeatherForecastFromAddress(address);
    console.log(result);
}

function resolve(res) {
    if(!res.ok) {throw new Error('Whoops!');}
    return res;
}

async function jsonify(response) {
    var jason = await response.json();
    console.log(jason);
    return jason;
    //return response.json();
}

function lookupUserAddress() {
    var address = document.getElementById('addressBox').value;
    var result = test_lookupAddressLocation(address);
    console.log(result);
}

function logger(response) {
    console.log(response);
    return response;
}