// Load event handler: Executes when document ready
$( function(){
    // Hide image
    $("#imageRow").hide();


    updateDate();
    rawDate = "2018-05-20 00:00:00";
    dateComponents = extractRawDate(rawDate);
<<<<<<< HEAD
    convert_UTCtoNZT();
    

=======

    
>>>>>>> 8919e4b93388bed584b47e758c2a54710615b658
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            // do this when browser location obtained (or refused)
            console.log("brower location", position.coords.latitude, position.coords.longitude);
            
            // call into weather api and get weather
            getWeatherData(position.coords.latitude, position.coords.longitude);
            
        });
    }
    //getTwoBlocks();
});

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

    var forecastdata;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        forecastdata = JSON.parse(xhr.responseText);      
        processWeatherData(forecastdata);
    }
    xhr.send(null);
}

// Processes the forecastData and changes DOM elements
function processWeatherData(forecastData){

    document.getElementById("weatherTitleThreeHours").innerHTML ="The next 3 hours"
    document.getElementById("weatherTitleThreeToSix").innerHTML  ="The 3 hours after that"

    // Get the text values of the next 2 3-hour weather blocks
    blockOne = forecastData.list[0].weather[0].main;
    blockTwo = forecastData.list[1].weather[0].main;

    changeButtonColor(blockOne, "blockOne");
    changeButtonColor(blockTwo, "blockTwo");

    changeImage(blockOne, blockTwo, "mainImage");
    $("#imageRow").show();

    if (blockOne == "Rain" || blockTwo =="Rain"){
        vartest = findNextTime(forecastData);
    } else {
       canHangWashing("You can hang your washing out, it isn't due to rain for the next 6 hours");

    }

}

function canHangWashing(text){
    //document.getElementById("mainStatement").innerHTML = text;
    $("#big-text").text("YES");
    $("#explain-text").text(text);
    console.log("YES clause triggered");
}

function alternativeTimeFound(text){
    $("#big-text").text("NO");
    $("#explain-text").text(text);
    console.log("Alternative clause triggered");
}

function noTimeFound(text){
    $("#big-text").text("NO");
    $("#explain-text").text(text);
    console.log("No alternative clause triggered");
}


function changeButtonColor(forecast, buttonId) {
    // Changes button color weather it's raining or not
    if (forecast == "Rain") {
        myButton = document.getElementById(buttonId).style
        myButton.backgroundColor = 'blue';
        myButton.borderColor = 'blue';
        myButton.color = 'white';
        console.log("#" + buttonId);
        $("#" + buttonId).text("Rain");
    }
    // Changes button color weather 
    if (forecast == "Clouds") {
        myButton = document.getElementById(buttonId).style
        myButton.backgroundColor = 'grey';
        myButton.borderColor = 'grey';
        myButton.color = 'white';
        $("#" + buttonId).text("Cloudy");
    }

        if (forecast == "Sun") {
        myButton = document.getElementById(buttonId).style
        myButton.backgroundColor = 'yellow';
        myButton.borderColor = 'yellow';
        myButton.color = 'white';
        $("#" + buttonId).text("Sunny");
    }
}

function findNextTime(forecastData){
    
    var i; // at the next 6 hours
    var j; 
    for (i = 2,  j =3; i < 24 ; i++, j++ ){
        if (forecastData.list[i].weather[0].main && forecastData.list[j].weather[0].main != "Rain"){
            alternativeTimeFound("But you may be able to do your washing on " + forecastData.list[i].dt_txt);
            break;
        }else{
            noTimeFound("You won't be able to do it for 3 days either.");
        }
    }   
}

//changes the laundry image if it is raining or not
function changeImage(blockOne, blockTwo, imageId){
    if(blockOne =="Rain" || blockTwo == "Rain"){
        document.getElementById(imageId).src = "images/rainy2.gif";
    }else{
        document.getElementById(imageId).src = "images/ok.gif"
    }

}
