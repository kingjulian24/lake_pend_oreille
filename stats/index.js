var async = require('async');
var request = require('request');
var dash = require('underscore');
var db = require('./models/readings');
var urlsGenerator = require('./urls');
var genDBRecords = require('./genDBRecords');
var processData = require('./processData');
var helpers = require('../test/helpers');
var queries, datesList;


exports.fetchData = function (dates, raw, cb) {
    datesList = dates;
    queries = processData.prepDBQuery(dates);
    async.waterfall([
        searchDBForDates,
        getMissingDates,
        saveMissingDatesToDB,
        getSavedDataFromDB
    ], function(err, data){
        var pdata = processData.processDBData(data, raw);
        if(pdata) {
            cb(null, pdata);
        } else {
            cb(true, pdata);
        }
        
    });
};

var searchDBForDates = function(cb) {
    async.map(datesList, queryDB, function(err, dates){
        var urlsList = urlsGenerator.getUrls(dash.compact(dates));
        cb (err, urlsList);
    });
};

var getMissingDates = function(urlsList, cb ) {
    async.map(urlsList, getReadingInner, function(err, readings){
        var records = genDBRecords.generate(readings);
        cb(err, records);
    });
};

var saveMissingDatesToDB = function(records, cb) {
    async.map(records, saveToDB, function(err, results){
        cb(err, results);
    });
};

var getSavedDataFromDB = function(unused, cb) {
    async.map(queries, getData, function(err, data){
        cb(err, data);
    });
};

var queryDB = function(date,cb ) {
     db.wind_speed.find({ date: date }, function(err,data){
        if(data.length < 1 ) { return cb( null, date ); } // return date not in db
        cb(null, false);      
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
        if(body) {
           cb(null, body.trim().split("\n")); 
        }
        
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
};

var getData = function(queryObj, cb) {
    async.map(queryObj, getDataInner, function(err, data){
        cb(err, data);
    });
};