//http://lpo.dt.navy.mil/data/DM/2014/2014_01_01/Air_Temp
//http://lpo.dt.navy.mil/data/DM/2014/2014_01_01/Wind_Speed
//http://lpo.dt.navy.mil/data/DM/2014/2014_01_01/Barometric_Press
var helpers = require('../test/helpers');

function formatDate(date) {
    if (date < 10) {
        return "0"+date;
    }
    return date;
}

module.exports = function( beginDate, endDate ) {
	helpers.pk('dates', beginDate, endDate)
    var days = endDate.getDate() - beginDate.getDate();
    var beginYear = beginDate.getFullYear();
    var beginMonth = beginDate.getMonth() + 1;
    var urls = {
        air_temp: [],
        bar_press: [],
        wind_speed: [],
        dates: []
    };

    var baseUrl = "http://lpo.dt.navy.mil/data/DM";
    var year, month, day, dateString, newDay;
    
    for( var i = 0; i <= days; i++ ) {
        newDay = beginDate.getDate() + i;
        newDate = new Date( beginYear+"/"+beginMonth+"/"+newDay );
        
        year = newDate.getFullYear();
        month = formatDate(newDate.getMonth());
        day = formatDate(newDate.getDate());
        dateString = year + "_" + month + "_" + day; 
        urls.air_temp[i] = baseUrl + "/" + year + "/" + dateString + "/Air_Temp";
        urls.bar_press[i] = baseUrl + "/" + year + "/" + dateString + "/Barometric_Press";
        urls.wind_speed[i] = baseUrl + "/" + year + "/" + dateString + "/Wind_Speed";
        urls.dates[i] = newDate.getTime();
    }
    return urls;
}




