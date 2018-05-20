// Constructing base HTTPRequest linked to uri
var uri = "http://api.timezonedb.com/v2/convert-time-zone";
var key = "WBNIFK1HLXYA";
var format = "json";
//var fieldsToReturn = "toTimestamp";
// var callback = "";
// var fields = "";

var prefix = uri + '?key=' + key
                 + '&format=' + format;
                //  + '&fields=' + fieldsToReturn;

function convert_UTCtoNZT(unixTime=Date.now()) {
    /* Converts some unix time from 'fromCity' to unix time of 'toCity'.

    Default value for 'unixTime' is current unix time.
    */
    
    // not including millisecond count from Date.now()
    unixTime = unixTime.toString().slice(0,10);

    var fromCity = "Africa/El_Aaiun";
    var toCity = "Pacific/Auckland";

    var fulluri = prefix 
                  + '&from=' + fromCity
                  + '&to=' + toCity
                  + '&time=' + unixTime;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", fulluri, true);
    xhr.onload = function () {
        var unixNZT = JSON.parse(xhr.responseText);
        alert(unixNZT["toTimestamp"]);
        var formattedTime = convertUnixToTimestamp(unixNZT["toTimestamp"]);
        
    }
    xhr.send(null);
}

function convertUnixToTimestamp(unixTime) {
    /* Converts unix time to a timestamp date in hh:mm:ss dd:mm:yyyy format

    SOURCE: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    */

    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    unixTime = 1526827060;
    
    var date = new Date(unixTime*1000);

    // Hours part from the timestamp
    var hours = (date.getHours() + 12) % 24;

    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Day part from the timestamp
    var day = date.toString().slice(0,3);

    // DateNum part from the timestamp
    var dateNum = date.getDate();

    // Month part from the timestamp
    var month = date.getMonth()+1;

    // Year party from the timestramp
    var year = date.getFullYear(); 

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' 
                        + minutes.substr(-2) + ':' 
                        + seconds.substr(-2) 
                        + ' on ' + day + ' ' 
                        + dateNum + '/' 
                        + month + '/' 
                        + year;

    return formattedTime;
}

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

