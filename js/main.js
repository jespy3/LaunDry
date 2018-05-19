// Load event handler: Executes when document ready
$( function(){
    var userLocation = getBrowserLocation();
    getTwoBlocks();
});

function getBrowserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position.coords.latitude, position.coords.longitude);
        });
    }
}

function changeSpan(number){
    // alert("YAY");

    document.getElementById("calculatedHours").innerHTML = number;
}

function testapi(){
    var aucklandid = "2193734";
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?id=" + aucklandid + "&mode=json&APPID=" + apikey

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);
        document.getElementById("datetime").innerHTML = forecastdata.list[0].dt_txt;
        document.getElementById("weather").innerHTML = forecastdata.list[0].weather[0].main;
        
    }
    xhr.send(null);
}

function testIntegration() {
    var userAddress = "12 Esmonde Rd";
    var latlong = guessAddress(userAddress);
    var forecast = getWeatherData(latlong.lat, latlong.lng);
    console.log(forecast);
}

// This function assumes that you are passing as its argument the returned value from address.js/getAddressLocation().
function getWeatherData(lat, long) {
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?lat=" + lat + "&lon=" + long + "&mode=json&APPID=" + apikey;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);
        return forecastdata        
    }
    xhr.send(null);
}

function getTwoBlocks(){
    var aucklandid = "2193734";
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?id=" + aucklandid + "&mode=json&APPID=" + apikey

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);

        // Turns button to read the weather (eg. Rain/Cloudy/Sunny etc.)
        document.getElementById("blockOne").innerHTML = forecastdata.list[0].weather[0].main;
        document.getElementById("blockTwo").innerHTML = forecastdata.list[1].weather[0].main;

        document.getElementById("weatherTitleThreeHours").innerHTML ="Weather in the next 3 hours"
        document.getElementById("weatherTitleThreeToSix").innerHTML  ="Weather for 3 to 6 hours "

        blockOne = forecastdata.list[0].weather[0].main;
        blockTwo = forecastdata.list[1].weather[0].main;
        changeButtonColor(blockOne, "blockOne");
        changeButtonColor(blockTwo, "blockTwo");

        if (blockOne == "Rain" || blockTwo =="Rain"){
            document.getElementById("mainStatement").innerHTML = "Do not hang out your washing"
        } else {
            document.getElementById("mainStatement").innerHTML = "It will not rain for the next 6"
        }


        
    }
    xhr.send(null);
}

function changeButtonColor(forecast, buttonId) {
    // Changes button color weather it's raining or not
    if (forecast == "Rain") {
        myButton = document.getElementById(buttonId).style
        myButton.backgroundColor = 'blue';
        myButton.borderColor = 'blue';
        myButton.color = 'white';
    }
    // Changes button color weather 
    if (forecast == "Clouds") {
        myButton = document.getElementById(buttonId).style
        myButton.backgroundColor = 'grey';
        myButton.borderColor = 'grey';
        myButton.color = 'white';
    }

        if (forecast == "Sun") {
        myButton = document.getElementById(buttonId).style
        myButton.backgroundColor = 'yellow';
        myButton.borderColor = 'yellow';
        myButton.color = 'white';
    }
}

function changeImage(){

}


