var dbF = require('../stats/dbFunctions');
var records;
var data = [
    {
        wind_speed: [ "2014_01_07 23:42:02 3.4 " ],
        air_temp: [ "2014_01_07 23:48:10 30.7 "],
        bar_press: ["2014_01_07 23:42:02 28.0 " ]
    },
    {
        air_temp: [ "2014_01_08 23:46:23 5.4 " ],
        wind_speed: [ "2014_01_08 23:46:23 5.4 " ],
        bar_press: [ "2014_01_08 23:46:23 35.8 " ]
    }
];


describe('DB functions stats', function(){
	it('should list db records', function(done){
		records = dbF.genRecords(data);
		records.length.should.eql(6);
		done();
	});
});
