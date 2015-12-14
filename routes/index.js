
/*
 * GET home page.
 */
var app = require('../stats');
var pdr = require('../stats/processDateRange');
var raw;
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getData = function(req, res){
    var dateRange = pdr(req.params);
    raw = false;
    if (!dateRange.err) {
        app.fetchData(dateRange.dates, raw, function(err, data){
           if(err) {
               res.send(err);
           } else {
               res.json(data); // some how this is not needed ????
           }
        });
        
    } else {
        res.status(403).json({error: dateRange.err.toString() });
    }
    
};

exports.getRawData = function(req, res){
    var dateRange = pdr(req.params);
    raw = true;
    if (!dateRange.err) {
        app.fetchData(dateRange.dates, raw, function(err, data){
           if(err) {
               res.send(err);
           } else {
               res.json(data); // some how this is not needed ????
           }
        });
        
    } else {
        res.status(403).json({error: dateRange.err.toString() });
    }
    
};




