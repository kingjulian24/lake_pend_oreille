var should = require('should');
var pdr = require('../stats/processDateRange');
var helpers = require('./helpers');

describe('Process Date Range stats', function(){
	it('should list date range in milliseconds', function(done){
		var x = pdr({
            year: "2014",
            start: "01-01",
            end: "01-01"
        });

		x.should.eql({ 
            dates: [ 1388552400000 ], 
            err: null 
        });
		done();
	});
});

