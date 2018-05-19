function changeSpan(number){
    // alert("YAY");

    document.getElementById("calculatedHours").innerHTML = number;
}

clearPreviousPastLife();

function testapi(){
    clearPreviousPastLife();
    var aucklandid = "2193734";
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?id=" + aucklandid + "&mode=json&APPID=" + apikey

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);
        //var datetime = forecastdata.dt_txt
        //var weather = forecastdata.weather.main
        //document.getElementById("datetime").innerHTML = datetime
        //document.getElementById("weather").innerHTML = weather
        document.getElementById("datetime").innerHTML = forecastdata.list[0].dt_txt;
        document.getElementById("weather").innerHTML = forecastdata.list[0].weather[0].main;
        
    }
    xhr.send(null);
}

function clearPreviousPastLife(){
    //document.getElementById("datetime").innerHTML = "";
    //document.getElementById("weather").innerHTML = "";
    //document.getElementById("test").innerHTML = "";
}

function getTwoBlocks(){
    clearPreviousPastLife();
    var aucklandid = "2193734";
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?id=" + aucklandid + "&mode=json&APPID=" + apikey

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);
        document.getElementById("blockOne").innerHTML = forecastdata.list[0].weather[0].main;
        document.getElementById("blockTwo").innerHTML = forecastdata.list[1].weather[0].main;

        document.getElementById("weatherTitleThreeHours").innerHTML ="Weather in the next 3 hours"
        document.getElementById("weatherTitleThreeToSix").innerHTML  ="Weather for 3 to 6 hours "
        blockOne = forecastdata.list[0].weather[0].main;
        blockTwo = forecastdata.list[1].weather[0].main;

        if (blockOne == "Rain" || blockTwo =="Rain"){
            document.getElementById("mainStatement").innerHTML = "Do not hang out washing"
        } else {
            document.getElementById("mainStatement").innerHTML = "It will not rain for the next 6"
        }


        
    }
    xhr.send(null);
}

