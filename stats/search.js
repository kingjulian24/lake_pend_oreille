var async = require('async');
var request = require('request');
var dash = require('underscore');
var db = require('./models/readings');
var urls = require('./urls');
var genDBRecords = require('./genDBRecords');
var helpers = require('../test/helpers');


var queryDB = function(date,cb ) {
     db.wind_speed.find({ date: date }, function(err,data){
        if(data.length < 1 ) { return cb( null, date ); } // return date not in db
        cb(null, false);      
     });
 };

var searchDB = function (dates, cb) {
    var queries = prepDBQuery(dates);
    async.map(dates, queryDB, function(err, dates){
        var urlsList = urls.getUrls(dash.compact(dates));
        async.map(urlsList, getReadingOuter, function(err, readings){
            var records = genDBRecords.generate(readings);
            async.map(records, saveToDB, function(err, results){
                async.map(queries, getData, function(err, data){
                    cb(processData(data));
                });
                    
            }); 
        });
 
    });
};

function processData(data) {
    var pd = {};
    var rawData = {
        wind_speed: [],
        air_temp: [],
        bar_press: []
    }
    var rawData2 = {
        wind_speed: [],
        air_temp: [],
        bar_press: []
    }
    for(prop in data){
        for(var i = 0; i < data[prop].length; i++ ){
            rawData[prop] = rawData[prop].concat(data[prop][i]);
        }
    }
    
    for (prop in rawData) {
        for(var i = 0; i < rawData[prop].length; i++ ){
            rawData2[prop].push(rawData[prop][i].data);
        }
    }

    
    for(prop in rawData2) {
        pd[prop] = getStats(rawData2[prop]);
    }
    
    return pd;
}

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

var getDataInner = function(queryObj, cb) {
    db[queryObj.type].find(queryObj.query, function(err, rows){
       cb(err,rows);
    });
}

var getData = function(queryObj, cb) {
    async.map(queryObj, getDataInner, function(err, data){
        cb(err, data);
    });
}



function prepDBQuery(dates) {
    var collections = ['air_temp', 'bar_press', 'wind_speed'];
    var query = {
        wind_speed:[],
        bar_press:[],
        air_temp:[]
    };
    for(var i = 0; i < dates.length; i++) {
       for(var j = 0; j < collections.length; j++) {
           query[collections[j]].push({
               query: {date: dates[i]},
               type: collections[j]
           });
       }
    }
    
    return query;
   

}


function getStats(readings) {
    // Mean
    var sum = dash.reduce(readings, function(memo, num){ return memo + num; });
    var mean = Math.round((sum/readings.length)*100)/100;

    // Median
    readings.sort();
    var isOdd = readings.length % 2 === 1 ? true : false;
    var median;
    if(isOdd){
        var index = Math.floor([readings.length/2]);
        median = readings[index];
    } else {
        var index1 = readings.length/2;
        var index2 = index1 - 1;
        median = (readings[index1] + readings[index2]) / 2;
    }

    return {
        mean: mean,
        median: median
    };
}
        

module.exports = {
    db: searchDB
};



