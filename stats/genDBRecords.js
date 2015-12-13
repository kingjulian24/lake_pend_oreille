var db = require('./models/readings');
var _ = require('underscore');
/*
* @param {array} list of readings
* @return {array} array of db records
*/
exports.generate = function(readingsList) {
    var r = readingsList;
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
};