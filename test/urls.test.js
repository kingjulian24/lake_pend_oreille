var should = require('should');
var urls = require('../stats/urls');
var helpers = require('./helpers');

d1 ="2014/01/01";
d2 ="2014/01/02";

describe('url stats', function(){
	it('should list urls', function(done){
		var x = urls(new Date(d1), new Date(d2));
		var expected =
		{ air_temp: 
			 [ 'http://lpo.dt.navy.mil/data/DM/2014/2014_00_01/Air_Temp',
				 'http://lpo.dt.navy.mil/data/DM/2014/2014_00_02/Air_Temp' ],
			bar_press: 
			 [ 'http://lpo.dt.navy.mil/data/DM/2014/2014_00_01/Barometric_Press',
				 'http://lpo.dt.navy.mil/data/DM/2014/2014_00_02/Barometric_Press' ],
			wind_speed: 
			 [ 'http://lpo.dt.navy.mil/data/DM/2014/2014_00_01/Wind_Speed',
				 'http://lpo.dt.navy.mil/data/DM/2014/2014_00_02/Wind_Speed' ],
			dates: [ 1388556000000, 1388642400000 ]
		};

		x.should.eql(expected);
		done();
		//console.log(x);
		//console.log(new Date(d1).getTime());
	});
});

