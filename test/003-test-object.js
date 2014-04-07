var path = require('path');
var assert = require("assert");

describe('Production.002 as Object', function(){
	before(function(){
		process.env = {};
		process.env.ECONF_ENV = 'production.002';
		require('../lib/index')(path.join(__dirname, '/.econf-object.js'), 'ECONF_ENV');
	});

	describe('NAME', function(){
		it('should return "Production 002"', function(){
			assert.equal('Production 002', process.env.NAME);
		});
	});

	describe('AWS_SECRET', function(){
		it('should return "aws-secret"', function(){
			assert.equal('aws-secret', process.env.AWS_SECRET);
		});
	});

	describe('AWS_KEY', function(){
		it('should return "aws-key"', function(){
			assert.equal('aws-key', process.env.AWS_KEY);
		});
	});

	describe('EMAIL_DELAY', function(){
		it('should return 0', function(){
			assert.equal(0, process.env.EMAIL_DELAY);
		});
	});
});