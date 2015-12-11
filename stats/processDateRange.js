var dra = require('date-range-array');
var _ = require('underscore');
var dateRange = {};
var MINYEAR = new Date("2006-12-31").getTime();
var todaysDate = new Date(Date.now());
var yesterday = todaysDate.getDate() - 1;
var thisMonth = todaysDate.getMonth();
var thisYear = todaysDate.getFullYear();
var maxDate = new Date(thisYear,thisMonth, yesterday).getTime();

console.log( MINYEAR );

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

 module.exports = function ( range ) {
    
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
     dateRange.err = "Out of Range";
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