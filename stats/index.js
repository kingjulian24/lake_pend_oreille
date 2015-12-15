var async = require('async');
var dash = require('underscore');
var urlsGenerator = require('./urls');
var genDBRecords = require('./genDBRecords');
var processData = require('./processData');
var dbF = require('./dbFunctions');
var siteF = require('./siteFunctions');
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
            cb(err, pdata);
        }
        
    });
};

var searchDBForDates = function(cb) {
    async.map(datesList, dbF.query, function(err, dates){
        var urlsList = urlsGenerator.getUrls(dash.compact(dates));
        cb (err, urlsList);
    });
};

var getMissingDates = function(urlsList, cb ) {
    async.map(urlsList, siteF.fetch , function(err, readings){
        var records = genDBRecords.generate(readings);
        cb(err, records);
    });
};

var saveMissingDatesToDB = function(records, cb) {
    async.map(records, dbF.save , function(err, results){
        cb(err, results);
    });
};

var getSavedDataFromDB = function(unused, cb) {
    async.map(queries, dbF.fetch , function(err, data){
        cb(err, data);
    });
};