function guessAddress(usertext) {
    var mapsapikey = "key=AIzaSyAXAnWVJ3Zjo0lwBw-6fKzvO-w7--W7_U4";
    var baseUri = "https://maps.googleapis.com/maps/api/place/";
    var autocomplete = "autocomplete/";
    var latlong = "location=-36.849998,174.783325";
    var components = "components=country:nz";
    var radius = "radius=200000";
    var types = "types=address";
    var input = "input=" + usertext;
    //console.log("Hi!");
    var autocompleteUri = baseUri + autocomplete + "json?" + mapsapikey + "&" + latlong + "&" + components
     + "&" + radius + "&" + types + "&" + input;

    console.log(autocompleteUri);
    var lookupResults;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", autocompleteUri, true);
    xhr.onload = function () {
        //lookupResults = JSON.parse(xhr.responseText);
        results = JSON.parse(xhr.responseText);
        console.log(results);

    }
    xhr.send(null);

    //console.log(JSON.stringify(lookupResults));

    return lookupResults.predictions[0];
}

function lookupAddressLocation() {
    var myaddress = "26 wicklow rd";
    var prediction = guessAddress(myaddress);
    var location = getAddressLocation(prediction);
}

function getAddressLocation(prediction) {
    var placeID = prediction.place_id;
    var mapsapikey = "key=AIzaSyAXAnWVJ3Zjo0lwBw-6fKzvO-w7--W7_U4";
    var baseUri = "https://maps.googleapis.com/maps/api/place/";
    var detailsUri = baseUri + "details/JSON?" + mapsapikey + "&placeid=" + placeID;

    console.log(detailsUri);
    var lookupResults;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", detailsUri, true);
    xhr.onload = function () {
        //lookupResults = JSON.parse(xhr.responseText);
        results = JSON.parse(xhr.responseText);
        console.log(results);

    }
    xhr.send(null);

    var locat = results.result.geometry.location;
    console.log(JSON.stringify(locat));

    return locat;
}