var async = require('async');
var request = require('request');
var dash = require('underscore');
var db = require('./models/readings');
var urls = require('./urls');
var genDBRecords = require('./genDBRecords');


var queryDB = function(date,cb ) {
     db.wind_speed.find({ date: date }, function(err,data){
        if(data.length < 1 ) { return cb( null, date ); } // return date not in db
        cb(null, false);      
     });
 };

var searchDB = function (dates, cb) {
    async.map(dates, queryDB, function(err, dates){
        var urlsList = urls.getUrls(dash.compact(dates));
        async.map(urlsList, getReadingOuter, function(err, readings){
            var records = genDBRecords.generate(readings);
            async.map(records, saveToDB, function(err, results){
                cb(results);
            }); 
        });
 
    });
};

var saveToDB = function(record, cb) {
   record.save(function(err){
       if(err) {
           cb(false, false);
       }
       cb(null, true);
   }); 
};

var getReadingInner = function(url, cb) {
    request(url, function(err,res,body){
        cb(null, body.trim().split("\n"));
    });
};

var getReadingOuter = function(urls, cb){ 
    async.map(urls, getReadingInner, function(err, data){
        cb(err, data);
    });
};


module.exports = {
    db: searchDB
};



