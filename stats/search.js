var urls = require('./urls');
var async = require('async');
var request = require('request');
var _= require('underscore');
var db;
var helpers = require('../test/helpers');

//why the dependancy injection for db?
var searchDB = function (d, userInput, cb) {
helpers.pk('search', d, userInput);
    db = d;
    var dates = urls(userInput.startDate, userInput.endDate).dates;
		console.log('dates',dates);

    async.map(dates, queryDB, function(err, data){
			console.log('map', err, data);
			if(err) return cb(err);
        cb(data);
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

/*
var url = "http://127.0.0.1:3000/getData/2014/01_01/01_06";
request(url , function(err,res,body){
	helpers.pk('1111', err, res, body);
    var data = JSON.parse(body);
    console.log(_.flatten(data));
});
*/

module.exports = {
    db: searchDB
};

//var notInDB = [];
//var searchDB = function (db, userInput, cb) {
//    var dates = urls(userInput.startDate, userInput.endDate).dates;
//    for(var i = 0; i < dates.length; i++){
//       queryDB(i,db,dates,cb);
//    }   
//};
//
//var queryDB = function(i,db,dates,cb ){
//     db.wsm.find({ date: dates[i] }, function(err,data){
//         console.log(i);
//         console.log(dates.length);
//         console.log(data);
//        if(data.length < 1 ){
//           notInDB.push(dates[i]);  
//        } 
//         
//                       
//         if(i + 1 == dates.length) {
//             cb(null,notInDB);
//         } 
//            
//     
//     });
// };

