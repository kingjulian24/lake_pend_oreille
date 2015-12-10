
/*
 * GET home page.
 */
var app = require('../stats');
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getData = function(req, res){
    var userInput = app.processDateRange(req.params);
    
    if (userInput.inRange) {
        
        app.search.db(app.db, userInput, function(err, data){

            
           if(err) {
               res.send(err);
           } else {
               res.json(data);
           }
        });
        
    } else {
        res.status(403).json({error: true, message: "The date range cannot be longer than 7 days"});
    }
    
};




