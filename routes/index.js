
/*
 * GET home page.
 */
var app = require('../stats');
var _ = require('underscore');
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getData = function(req, res){
    var dateRange = app.processDateRange(req.params);
    
    if (!dateRange.err) {
        app.search.db(dateRange.dates, function(err, data){
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




