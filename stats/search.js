var async = require('async');
var request = require('request');
var _= require('underscore');
var db = require('./models/readings');
var moment = require('moment');

var queryDB = function(date,cb ) {
     db.wind_speed.find({ date: date }, function(err,data){
        if(data.length < 1 ) { return cb( null, date ); } // return date not in db
        cb(null, false);      
     });
 };

var searchDB = function (dates, cb) {
    async.map(dates, queryDB, function(err, dates){
        var urls = getUrls(_.compact(dates));
        async.map(urls, getReadingOuter, function(err, readings){
            var fr = formatReadings(readings);
            async.map(fr, saveToDB, function(err, results){
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


function formatReadings(r) {
    var records = [];
    var readingArr, dateStr,id;
    for(var i = 0; i < r.length; i++) {
        var obj = r[i];
        for(prop in obj){
            for (var i = 0; i < obj[prop].length; i++) {
                readingArr = _.compact(obj[prop][i].trim().split(" "));
                dateStr = new Date( readingArr[0].replace(/_/g,"/") ).getTime();
                id = new Date ( readingArr[0].replace(/_/g,"/") +" "+ readingArr[1] ).getTime();
                records.push(
                    new db[prop]({
                        _id: id,
                        date: dateStr,
                        data: parseFloat(readingArr[2])
                    })
                );
            
            }
        } 
    }
    return records;
}


function getUrls(dates) {
    var baseUrl = "http://lpo.dt.navy.mil/data/DM/",
        newDate, fDate, year;
    var urls = _.map(dates, function(date){
        newDate = new Date(date);
        fDate = moment(newDate).format('YYYY_MM_DD');
        year = moment(newDate).format('YYYY');
        return {
            wind_speed : baseUrl +""+year+"/"+fDate+"/Wind_Speed",
            air_temp : baseUrl +""+year+"/"+fDate+"/Air_Temp",
            bar_press : baseUrl +""+year+"/"+fDate+"/Barometric_Press"
        };
    });
    
    return urls;
}



module.exports = {
    db: searchDB
};



