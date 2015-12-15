var should = require('should');
var pd = require('../stats/processData');
var helpers = require('./helpers');

var d1 ="2014/01/01";
var d3 = [new Date(d1).getTime()];
var expected = {
    wind_speed: [
        {
            query: {
                date: 1388552400000
            },
            type: "wind_speed"
        }
    ],
    bar_press: [
        {
            query: {
                date: 1388552400000
            },
            type: "bar_press"
        }
    ],
    air_temp: [
        {
            query: {
                date: 1388552400000
            },
            type: "air_temp"
        }
    ]
};

var d4 = {
    wind_speed: [
        [
            {
                _id: 1388552577000,
                date: 1388552400000,
                data: 7.60,
                __v: 0
            }
        ]
    ],
    air_temp: [
        [
            {
                _id: 1388552577000,
                date: 1388552400000,
                data: 7.60,
                __v: 0
            }
        ]
    ],
    bar_press: [
        [
            {
                _id: 1388552577000,
                date: 1388552400000,
                data: 7.60,
                __v: 0
            }
        ]
    ],
};

var e2 = {
    wind_speed: { mean: 7.60, median: 7.60 },
    air_temp: { mean: 7.60, median: 7.60 },
    bar_press: { mean: 7.60, median: 7.60 } 
};
var e3 = { 
    wind_speed: [ { _id: 1388552577000, date: 1388552400000, data: 7.60, __v: 0 } ],
    air_temp: [ { _id: 1388552577000, date: 1388552400000, data: 7.60, __v: 0 } ],
    bar_press: [ { _id: 1388552577000, date: 1388552400000, data: 7.60, __v: 0 } ] 
};

describe('process data stats', function(){
	it('should generate queries', function(done){
        var x = pd.prepDBQuery(d3);
        x.should.eql(expected);
        done();
	});
    it('should generate summary', function(done){
        var x = pd.processDBData(d4);
        x.should.eql(e2);
        done();
	});
    it('should generate raw data', function(done){
        var x = pd.processDBData(d4, true);
        x.should.eql(e3);
        done();
	});
});

