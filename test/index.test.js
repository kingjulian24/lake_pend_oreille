var should = require('should');
var helpers = require('./helpers');
var req = require('request');

describe('App stats', function(){
    it('should list summary via http request', function(done){
		req('http://localhost:3000/getData/2014/01-01/01-01', function(err, res, body){
            JSON.parse(body).should.eql({ 
                wind_speed: { mean: 3.89, median: 2.8 },
                air_temp: { mean: 36.18, median: 36.3 },
                bar_press: { mean: 28.26, median: 28.3 } 
            });
            done();
        });
	});
    it('should list raw data via http request', function(done){
		req('http://localhost:3000/getData/2014/01-01/01-01/raw', function(err, res, body){
            JSON.parse(body).wind_speed.length.should.eql(231);
            done();
        });
	});
});

