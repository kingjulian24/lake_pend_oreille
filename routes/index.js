
/*
 * GET home page.
 */
var app = require('../stats');
var raw;
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getData = function(req, res){
    var dateRange = app.processDateRange(req.params);
    raw = false;
    if (!dateRange.err) {
        app.search.db(dateRange.dates, raw, function(err, data){
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
    var dateRange = app.processDateRange(req.params);
    raw = true;
    if (!dateRange.err) {
        app.search.db(dateRange.dates, raw, function(err, data){
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




