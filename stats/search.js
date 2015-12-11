var async = require('async');
var request = require('request');
var _= require('underscore');
var db = require('./models/readings');
var moment = require('moment');

var queryDB = function(date,cb ) {
     db.wsm.find({ date: date }, function(err,data){
        if(data.length < 1 ) { return cb( null, date ); } // return date not in db
        cb(null, false);      
     });
 };

var searchDB = function (dates, cb) {
    async.map(dates, queryDB, function(err, dates){
        var urls = getUrls(_.compact(dates));
        cb(urls);
    });
};

function getUrls(dates) {
    var baseUrl = "http://lpo.dt.navy.mil/data/DM/";
    var urls = _.map(dates, function(date){
        var newDate = new Date(date);
        var md = moment(newDate).format('MM_DD');
        var year = moment(newDate).format('YYYY');
        return {
            wind_speed : baseUrl +""+year+"/"+md+"/Wind_Speed",
            air_temp : baseUrl +""+year+"/"+md+"/Air_Temp",
            bar_press : baseUrl +""+year+"/"+md+"/Barometric_Press"
        };
    });
    
    return urls;
}

module.exports = {
    db: searchDB
};



