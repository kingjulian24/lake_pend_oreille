var range = require('../stats/range');
var records;
var d1 ="2014/01/01";
var d2 ="2014/01/02";
var d3 = [new Date(d1).getTime(), new Date(d2).getTime()];

describe('Range stats', function(){
	it('should list urls', function(done){
		var x = range.getUrls(d3);
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
    
    it('should list dates in milliseconds', function(done){
		var x = range.getDates({
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
