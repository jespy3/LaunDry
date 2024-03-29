function guessAddress(usertext) {
    var mapsapikey = "key=AIzaSyAXAnWVJ3Zjo0lwBw-6fKzvO-w7--W7_U4";
    var baseUri = "https://maps.googleapis.com/maps/api/place/";
    var autocomplete = "autocomplete/";
    var latlong = "location=-36.849998,174.783325";  // Lat & long for Auckland taken from the city.list.json file
    var components = "components=country:nz";
    var radius = "radius=200000"; // 200,000 metres / 200 kilometres
    var types = "types=address";
    var input = "input=" + usertext;

    //var input = "input=12 Esmonde Rd";

    //console.log("Hi!");
    var autocompleteUri = baseUri + autocomplete + "json?" + mapsapikey + "&" + latlong + "&" + components
     + "&" + radius + "&" + types + "&" + input;

    console.log(autocompleteUri);
    var lookupResults;
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
    xhr.send(null);

    //console.log(JSON.stringify(lookupResults));

    
}

/* function lookupAddressLocation() {
    
    var prediction = guessAddress(myaddress);
    var location = getAddressLocation(prediction);
} */

function getAddressLocation(prediction) {
    var placeID = prediction.place_id;
    var mapsapikey = "key=AIzaSyAXAnWVJ3Zjo0lwBw-6fKzvO-w7--W7_U4";
    var baseUri = "https://maps.googleapis.com/maps/api/place/";
    var detailsUri = baseUri + "details/json?" + "placeid=" + placeID + "&" + mapsapikey ;

    console.log(detailsUri);
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
    xhr.send(null);


}