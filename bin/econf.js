#!/usr/bin/env node

var program = require('commander'),
	pkg = require('../package.json'),
	version = pkg.version,
	econf = require('../lib/index.js');

program
	.version(version)

program
	.command('init')
	.description('add .econf.js file to your project')
	.action(function() {
		econf.createEconfFile()
	})

program.parse(process.argv);

if (program.args.length === 0) {
	econf.showEconfContent()
}

var path = program.rawArgs[3] || '.';