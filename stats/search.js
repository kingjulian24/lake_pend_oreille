var async = require('async');
var request = require('request');
var _= require('underscore');
var db = require('./models/readings');


var searchDB = function (dates, cb) {
    async.map(dates, queryDB, function(err, data){
        cb(_.flatten(data));
    });
  
};

var queryDB = function(date,cb ) {
    var missingIDs = [];
     db.wsm.find({ date: date }, function(err,data){
        if(data.length < 1 ){
           missingIDs.push(date);  
        }
         return cb( null, missingIDs );
     });
 };



module.exports = {
    db: searchDB
};



