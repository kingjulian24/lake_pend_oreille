var should = require('should');
var sinon = require('sinon');
var request = require('request');

var search = require('../stats/search');
var urls = require('../stats/urls');
var mongoose = require('../stats/models/readings.js');
var helpers = require('./helpers');

describe('search stats', function() {
	var server;

	beforeEach(function(){
		sinon.stub(mongoose, 'wsm');//.returns([]);
		//server = sinon.fakeServer.create();
		//sinon.stub(request).returns(null, {}, {});
	});

	afterEach(function(){
		sinon.restore(mongoose);
		//server.restore();
		//sinon.restore(request);
	});

	it('should search the db', function(done){
		//server.request[0].respond({},{},{});
		//urls.returns([]);
		//helpers.pk(urls);

		var dates = {
			startDate:"2014/01/01",
			endDate: "2014/01/02"
		};
		mongoose.wsm.find.yield(null);

		search.db(mongoose, dates, function(err, data) {
			should.not.exist(err);
			data.should.be.an.instanceOf(Array);
		});
	});

});
