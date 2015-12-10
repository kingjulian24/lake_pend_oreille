var db = require('./index').db;
var async = require('async');
var cb = function (err, data){
    console.log(data);
}
var query = {
    date: 1388552400000
};
var dates = [
1388552400000,
1388638800000,
1388725200000
];
var queryDB = function(query, cb) {
    db.wsm.find(query, cb);
}

async.each(dates,function(dates, cb){
    
});

