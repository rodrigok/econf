var fs = require('fs'),
	util = require('util'),
	colors = require('colors');


module.exports.envName = 'ECONF_ENV';


var applyIf = function (object, config) {
	var property;

	if (object) {
		for (property in config) {
			if (object[property] === undefined) {
				object[property] = config[property];
			}
		}
	}

	return object;
};


var processHierarchy = function(objects) {
	var dict = {};

	objects.forEach(function(object) {
		dict[object._name || 'development'] = object;
	});

	objects.forEach(function(object) {
		if (object._extend) {
			[].concat(object._extend).forEach(function(_extend) {
				if (dict[_extend]) {
					applyIf(object, dict[_extend]);
				}
			});
		}
	});

	return dict;
};


var applyEnv = function(object) {
	var appliedEnv = {};

	for (var property in object) {
		if (property === module.exports.envName) {
			continue;
		}

		process.env[property] = object[property];
		appliedEnv[property] = object[property];
	}

	return appliedEnv;
};


var populateEnv = function(objectsDict) {
	var env = process.env[module.exports.envName] || 'development';
	var objectToPopulateEnv = objectsDict[env];

	if (objectToPopulateEnv === undefined) {
		return console.log(module.exports.envName, env, 'not found in .econf.json');
	}

	return applyEnv(objectToPopulateEnv);
};


module.exports = function(econfFile, envName) {
	econfFile = econfFile || process.cwd() + '/.econf.js';

	if (typeof envName === 'string') {
		module.exports.envName = envName;
	}

	try	{
		objects = require(econfFile);

		if (!util.isArray(objects)) {
			objects = [objects];
		}
		objects = processHierarchy(objects);

		return populateEnv(objects);
	} catch(err) {
		console.log(err);
	}
};


module.exports.showEconfContent = function(cb) {
	var path = process.cwd() + '/.econf.js';

	fs.stat(path, function(err) {
		if (err) {
			console.log('File .econf.js not found'.red);
			console.log('To create .econf.js execute:'.yellow, 'econf init');
			return;
		}

		var objects = require(path);
		objects = processHierarchy(objects);

		for(var property in objects) {
			var object = objects[property];
			var _extend = '';
			if (object._extend) {
				_extend = [].concat(object._extend);
				_extend = _extend.join(', ');
				_extend = '{' + _extend + '}';
			}
			console.log('');
			console.log(property.green, _extend.yellow);

			delete object._name;
			delete object._extend;
			console.log(' ', JSON.stringify(object, null, '  ').replace(/\n/g, '\n  ').grey);
		}

		if (cb) {
			cb();
		}
	});
};


module.exports.createEconfFile = function() {
	var file = fs.readFileSync(__dirname + '/../.econf.js');
	fs.writeFileSync(process.cwd() + '/.econf.js', file);

	module.exports.showEconfContent(function() {
		console.log('');
		console.log('###########################################'.yellow);
		console.log('### Do not forget to install econf lib  ###'.yellow);
		console.log('###                                     ###'.yellow);
		console.log('###'.yellow, 'npm install econf --save           ', '###'.yellow);
		console.log('###                                     ###'.yellow);
		console.log('### Do not forget to include econf lib  ###'.yellow);
		console.log('### into your project at the first line ###'.yellow);
		console.log('###                                     ###'.yellow);
		console.log('###'.yellow, 'require("econf")()                 ', '###'.yellow);
		console.log('###                                     ###'.yellow);
		console.log('###########################################'.yellow);
	});
};