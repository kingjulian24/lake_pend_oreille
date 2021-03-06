var siteF = require('../stats/siteFunctions');
var dbF = require('../stats/dbFunctions');
var async = require('async');
var data = [ { wind_speed: 'http://lpo.dt.navy.mil/data/DM/2014/2014_02_04/Wind_Speed',
    air_temp: 'http://lpo.dt.navy.mil/data/DM/2014/2014_02_04/Air_Temp',
    bar_press: 'http://lpo.dt.navy.mil/data/DM/2014/2014_02_04/Barometric_Press' },
  { wind_speed: 'http://lpo.dt.navy.mil/data/DM/2014/2014_02_05/Wind_Speed',
    air_temp: 'http://lpo.dt.navy.mil/data/DM/2014/2014_02_05/Air_Temp',
    bar_press: 'http://lpo.dt.navy.mil/data/DM/2014/2014_02_05/Barometric_Press' } ];


describe('Site functions stats', function(){
	it('should list lpo readings', function(done){
        async.map(data, siteF.fetch, function(err, readings){
            var records = dbF.genRecords(readings);
            console.log('records: ', records.length);
            readings.length.should.eql(2);
            readings.forEach(function(obj){
                for(type in obj){
                    console.log(type, obj[type].length);
                }
            });
             done();
        });
	});
});
