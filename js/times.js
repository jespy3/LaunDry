function updateDate() {
    /* Changes the element displaying the date to most recent.
    */
    var rawDate = new Date();
    var day = rawDate.getDate();
    var month = rawDate.getMonth()+1;  
    var year = rawDate.getFullYear();  
    
    var prettyDate = day + '-' + month + '-' + year;
    document.getElementById("currentTime").innerHTML = prettyDate;
}

function convert_UTCtoNZT() {
    // yyyy-mm-dd hh:mm:ss

    var aucklandid = "2193734";
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?id=" + aucklandid + "&mode=json&APPID=" + apikey

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);
        rawTime=forecastdata.list[0].dt_txt;
        alert(rawTime);
    }
    xhr.send(null);
}