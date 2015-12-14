
/*
 * GET home page.
 */
var app = require('../stats');
var pdr = require('../stats/processDateRange');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getData = function(req, res){
    var dateRange = pdr(req.params);
    if (!dateRange.err) {
        app.fetchData(dateRange.dates, false, function(err, data){
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
    if (!dateRange.err) {
        app.fetchData(dateRange.dates, true, function(err, data){
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




