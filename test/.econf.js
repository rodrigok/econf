module.exports = [
	{
		_name: 'newrelic',
		NEW_RELIC_KEY: 'key'
	},
	{
		_name: 'production',
		NAME: 'Production Base',
		AWS_SECRET: 'aws-secret',
		AWS_KEY: 'aws-key',
		EMAIL_DELAY: 1000
	},
	{
		_name: 'production.001',
		_extend: ['production', 'newrelic'],
		NAME: 'Production 001',
		EMAIL_DELAY: 0
	}
]