var request = require('request');
var async = require('async');

exports.fetch = function(urls, cb){
    async.map(urls, fetchHelper, function(err, data){
        cb(err, data);
    });
};


var fetchHelper = function(url, cb) {
    request(url, function(err,res,body){
        if(body) {
           cb(null, body.trim().split("\n")); 
        }
        
    });
};