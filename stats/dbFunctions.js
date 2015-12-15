var db = require('./models/readings');
var async = require('async');

exports.save = function(record, cb) {
   record.save(function(err){
       if(err) {
           cb(false, false);
       }
       cb(null, true);
   }); 
};

exports.query = function(date,cb ) {
     db.wind_speed.find({ date: date }, function(err,data){
        if(data.length < 1 ) { return cb( null, date ); } // return date not in db
        cb(null, false);      
     });
 };

exports.fetch = function(queryObj, cb) {
    async.map(queryObj, fetchHelper, function(err, data){
        cb(err, data);
    });
};

var fetchHelper = function(queryObj, cb) {
    db[queryObj.type].find(queryObj.query, function(err, rows){
       cb(err,rows);
    });
};



