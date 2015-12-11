var async = require('async');
var request = require('request');
var _= require('underscore');
var db = require('./models/readings');

var queryDB = function(date,cb ) {
     db.wsm.find({ date: date }, function(err,data){
        if(data.length < 1 ) { return cb( null, date ); } // return date not in db
        cb(null, false);      
     });
 };

var searchDB = function (dates, cb) {
    async.map(dates, queryDB, function(err, data){
        cb(_.compact(data));
    });
};

module.exports = {
    db: searchDB
};



