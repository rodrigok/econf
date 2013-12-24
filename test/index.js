process.env.NODE_ENV = 'production.001';
var env = require('../lib/index')();

console.log(JSON.stringify(env, null, '  '));
