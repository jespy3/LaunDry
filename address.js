function guessAddress(usertext) {
    var mapsapikey = "key=AIzaSyAXAnWVJ3Zjo0lwBw-6fKzvO-w7--W7_U4";
    var baseUri = "https://maps.googleapis.com/maps/api/place/";
    var autocomplete = "autocomplete/";
    var latlong = "location=-36.849998,174.783325";
    var components = "components=country:nz";
    var radius = "radius=200000";
    var types = "types=address";
    //var input = "input=" + usertext;

    var input = "input=14 westwell rd";

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
        var location = getAddressLocation(lookupResults.predictions[0])
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