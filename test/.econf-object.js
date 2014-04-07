module.exports = {
	'newrelic': {
		NEW_RELIC_KEY: 'key'
	},
	'production': {
		NAME: 'Production Base',
		AWS_SECRET: 'aws-secret',
		AWS_KEY: 'aws-key',
		EMAIL_DELAY: 1000
	},
	'production.002': {
		_extend: ['production', 'newrelic'],
		NAME: 'Production 002',
		EMAIL_DELAY: 0
	}
}