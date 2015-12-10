var urls = require('./urls');
var async = require('async');

var notInDB = [];
var searchDB = function (db, userInput, cb) {
    var dates = urls(userInput.startDate, userInput.endDate).dates;
    cb(dates);
//    for(var i = 0; i < dates.length; i++){
//       queryDB(i,db,dates,cb);
//    }   
};

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

