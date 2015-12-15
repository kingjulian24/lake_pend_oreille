
/*
 * GET home page.
 */
var app = require('../stats');
var pdr = require('../stats/processDateRange');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getData = function(req, res){
    var raw = req.url.trim().split("/")[5];
    raw = raw ? true : false;
    console.log(raw);
    var dateRange = pdr(req.params);
    if (!dateRange.err) {
        app.fetchData(dateRange.dates, raw, function(err, data){
           if(err) {
               res.send(err);
           } else {
               res.json(data); 
           }
        });
        
    } else {
        res.status(403).json({error: dateRange.err.toString() });
    }
    
};





