var dra = require('date-range-array');
var _ = require('underscore');

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
    var dateRange = {};
    // Generate date range array 
    try {
       var dates = dra(range.year+"-"+range.start, range.year+"-"+range.end); 
    } catch (e) {
        return {err: e};
    }
    
    // Convert dates to millisecond
    dates = _.map(dates, function(date){ return new Date(date).getTime();});
    
    dateRange.dates = dates;
    dateRange.err = dates.length < 8 ? null : "Out of Range";
    
    return dateRange;   
}