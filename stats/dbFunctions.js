var db = require('./models/readings');
var async = require('async');
var _ = require('underscore');

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

/*
* @param {array} list of readings
* @return {array} array of db records
*/
exports.genRecords = function(readingsList) {
    var r = readingsList;
    var records = [];
    var readingArr, dateStr,id;
    
    readingsList.forEach(function(typeObj){
        for(type in typeObj){
            for(var i = 0; i < typeObj[type].length; i++) {
                readingArr = _.compact(typeObj[type][i].trim().split(" "));
                dateStr = new Date( readingArr[0].replace(/_/g,"/") ).getTime();
                id = new Date ( readingArr[0].replace(/_/g,"/") +" "+ readingArr[1] ).getTime();
                records.push(
                    new db[type]({
                        _id: id,
                        date: dateStr,
                        data: parseFloat(readingArr[2])
                    })
                );
            
            } // for var
            
        } // for type
    });
    
    return records;
};




