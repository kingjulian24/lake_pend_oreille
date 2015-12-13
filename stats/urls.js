var _ = require('underscore');
var moment = require('moment');
/*
* @param {array} dates in milliseconds
* @return {array} urls
*/
exports.getUrls = function(dates) {
    var baseUrl = "http://lpo.dt.navy.mil/data/DM/",
        newDate, fDate, year;
    var urls = _.map(dates, function(date){
        newDate = new Date(date);
        fDate = moment(newDate).format('YYYY_MM_DD');
        year = moment(newDate).format('YYYY');
        return {
            wind_speed : baseUrl +""+year+"/"+fDate+"/Wind_Speed",
            air_temp : baseUrl +""+year+"/"+fDate+"/Air_Temp",
            bar_press : baseUrl +""+year+"/"+fDate+"/Barometric_Press"
        };
    });
    
    return urls;
};
