var mongoose = require('./models/readings.js');
var newDate = new Date("2014/01/02 00:00:10").getTime();
var date = new Date("2014/01/02").getTime();
var record = new mongoose.atm({
    _id: newDate,
    date: date,
    data: 45.7
});


record.save(function(err){
    if(!err){
        console.log('saved :)');
    } else {
        console.log(err);
    }
});
//{
//    $and: 
//    [
//        {
//            date:
//            {
//                $gte: 1388552400000
//            }
//        },
//        {
//            data:
//            {
//                $lte: 1388552400000
//                
//            }
//        }
//    ]
//}

//var wsm = mongoose.wsm;
//wsm.aggregate([
//    {
//        $group:{
//            avgData:{
//                $avg: "$data"
//            }
//        }
//    }
//], function(err,data){
//    if(err) return console.log(err);
//    console.log(data);
//});
