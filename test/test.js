process.env.NODE_ENV = 'production.001';
var env = require('../lib/index')();

var assert = require("assert")
describe('Production.001', function(){
	describe('NAME', function(){
		it('should return "Production 001"', function(){
			assert.equal('Production 001', process.env.NAME);
		})
	})

	describe('AWS_SECRET', function(){
		it('should return "aws-secret"', function(){
			assert.equal('aws-secret', process.env.AWS_SECRET);
		})
	})

	describe('AWS_KEY', function(){
		it('should return "aws-key"', function(){
			assert.equal('aws-key', process.env.AWS_KEY);
		})
	})
	
	describe('EMAIL_DELAY', function(){
		it('should return 0', function(){
			assert.equal(0, process.env.EMAIL_DELAY);
		})
	})
})