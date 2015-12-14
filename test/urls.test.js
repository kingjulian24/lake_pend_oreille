var should = require('should');
var urls = require('../stats/urls');
var helpers = require('./helpers');

var d1 ="2014/01/01";
var d2 ="2014/01/02";
var d3 = [new Date(d1).getTime(), new Date(d2).getTime()];

describe('url stats', function(){
	it('should list urls', function(done){
		var x = urls.getUrls(d3);
		var expected = [
               {
                    air_temp: 'http://lpo.dt.navy.mil/data/DM/2014/2014_01_01/Air_Temp',
                    bar_press: 'http://lpo.dt.navy.mil/data/DM/2014/2014_01_01/Barometric_Press',
                    wind_speed: 'http://lpo.dt.navy.mil/data/DM/2014/2014_01_01/Wind_Speed'
              },
               {
                    air_temp: 'http://lpo.dt.navy.mil/data/DM/2014/2014_01_02/Air_Temp',
                    bar_press: 'http://lpo.dt.navy.mil/data/DM/2014/2014_01_02/Barometric_Press',
                    wind_speed: 'http://lpo.dt.navy.mil/data/DM/2014/2014_01_02/Wind_Speed'
              }
        ];

		x.should.eql(expected);
		done();
	});
});

