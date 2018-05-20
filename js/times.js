function updateDate() {
    /* Changes the element displaying the date to most recent.
    */
    var rawDate = new Date();
    var day = rawDate.getDate();
    var month = rawDate.getMonth()+1;  
    var year = rawDate.getFullYear();  
    
    var prettyDate = day + '-' + month + '-' + year;
}
function getFirstDate() {
    // yyyy-mm-dd hh:mm:ss

    // Not returning!!


    var aucklandid = "2193734";
    var apikey = "ab3b534277236c4d3ea8a475ecef0705";
    var uri = "http://api.openweathermap.org/data/2.5/forecast";

    var fulluri = uri + "?id=" + aucklandid + "&mode=json&APPID=" + apikey

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var forecastdata = JSON.parse(xhr.responseText);
        rawTime=forecastdata.list[0].dt_txt;
        return rawTime;
    }
    xhr.send(null);
}

function extractRawDate(rawDate) {
    // returns list of date components: [dd, mm, yyyy, hh, mm, ss]
    
    year = "";
    month = "";
    day = "";
    hours = "";
    mins = "";
    secs = "";

    for (var i = 0; i < rawDate.length; i++) {
        if (i<4) {
            year += rawDate[i]
        } else if (i == 5 || i == 6) {
            month += rawDate[i]
        } else if (i == 8 || i == 9) {
            day += rawDate[i]
        } else if (i == 11 || i == 12) {
            hours += rawDate[i]
        } else if (i == 14 || i == 15) {
            mins += rawDate[i]
        } else if (i == 17 || i == 18) {
            secs += rawDate[i]
        }
    }
    return [day, month, year, hours, mins, secs];
}

