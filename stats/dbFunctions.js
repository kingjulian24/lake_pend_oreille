var db = require('./db');
var async = require('async');
var _ = require('underscore');

exports.save = function(record, cb) {
   db[record.type].put(record.key,record.value, function(err){
       if(!err){
           cb(null, 'done');
       } else {
           cb(err, null);
       }
   });
};

exports.query = function(date,cb ) {
    var recs = [];
    db.wind_speed.createReadStream()
    .on('data', function(data){
        if(data.value.date == date) {
            recs.push(data);
        }     
    })
    .on('error', function(error){
        cb(error, null);
    })
    .on('end', function(){
        if(recs.length == 0) {
            cb(null, date);
        } else {
            cb(null, false);
        }
    });
 };

exports.fetch = function(queryObj, cb) {
    async.map(queryObj, fetchHelper, function(err, data){
        cb(err, data);
    });
};

var fetchHelper = function(queryObj, cb) {
    var recs = [];
    db[queryObj.type].createReadStream()
    .on('data', function(data){
        if(data.value.date == queryObj.query.date) {
            recs.push(data);
        }     
    })
    .on('error', function(error){
        cb(error, null);
    })
    .on('end', function(){
        cb(null, recs);
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
                    {
                        type: type,
                        key: id,
                        value: {
                            date: dateStr,
                            data: parseFloat(readingArr[2])
                        }
                    } 
                );
            
            } // for var
            
        } // for type
    });
    
    return records;
};




