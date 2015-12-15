var _ = require('underscore');
var moment = require('moment');
var dra = require('date-range-array');
var dateRange = {};
var MINYEAR = new Date("2006-12-31").getTime();
var todaysDate = new Date(Date.now());
var yesterday = todaysDate.getDate() - 1;
var thisMonth = todaysDate.getMonth();
var thisYear = todaysDate.getFullYear();
var maxDate = new Date(thisYear,thisMonth, yesterday).getTime();

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




/*
    @param {}
    param = {
        year: YYYY: String,
        start: MM-DD: String,
        end: MM-DD: String
    }
    
    return = {
        dateRange: [] : Number : milliseconds,
        err: Null/String
    }
*/

 exports.getDates = function ( range ) {
    
    // Generate date range array 
    try {
        var dates = dra(range.year+"-"+range.start, range.year+"-"+range.end); 
    } catch (e) {
        if(e.message == 'Unrecognized date format. Try YYYY-MM-DD') {
            e = new Error('Unrecognized date format. Try YYYY/MM-DD/MM-DD');
        }
        return {err: e};
    }
    
     // Convert dates to millisecond
     dates = _.map(dates, function(date){ return new Date(date.replace(/-/g,"/")).getTime();});
     dateRange.dates = dates;
     isValid(dates);

    return dateRange;   
}
 
function isValid( dates ) {

 if( dates.length > 7 ){
     dateRange.err = "Out of Range, Please use a range that is 7 days or less.";
     return;   
 }

 for(var i = 0; i < dates.length; i++) {
     var date = new Date(dates[i]).getTime();
     if(date < MINYEAR ) {
         dateRange.err = "Year must start at 2007";
        return;
     }
     if (date > maxDate) {
         dateRange.err = "Yesterday is the max date allowed";
        return;
     }
 }

 dateRange.err = null;

}