 module.exports = function(req) {
    var year = parseInt(req.year);
    var month = parseInt( req.start.substr( 0, 2 ) );
    var day = parseInt( req.start.substr(3) );
    var startDay = new Date( year+"/"+month+"/"+day );
    
    var eMonth = parseInt( req.end.substr( 0, 2 ) );
    var eDay = parseInt( req.end.substr(3) );
    var endDay = new Date( year+"/"+eMonth+"/"+eDay );
    
    var dateRangeObj = {
        siteStartUrl: "http://lpo.dt.navy.mil/data/DM/" + req.year + "/" + req.year + "_" + req.start + "/Air_Temp",
        siteEndUrl: "http://lpo.dt.navy.mil/data/DM/" + req.year + "/" + req.year + "_" + req.end + "/Air_Temp",
        startDate: startDay,
        endDate: endDay,
        inRange: endDay.getDate() - startDay.getDate() < 8 ? true : false
    };
    
    return dateRangeObj;
};