var fs = require('fs'),
	util = require('util');


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
}


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
			})
		}
	});

	return dict;
}


var applyEnv = function(object) {
	var appliedEnv = {};

	for (property in object) {
		if (property === 'NODE_ENV') {
			continue;
		}

		process.env[property] = object[property];
		appliedEnv[property] = object[property];
	}

	return appliedEnv;
}


var populateEnv = function(objectsDict) {
	var env = process.env.NODE_ENV || 'development';
	var objectToPopulateEnv = objectsDict[env];

	if (objectToPopulateEnv == undefined) {
		return console.log('NODE_ENV', env, 'not found in .econf.json')
	}

	return applyEnv(objectToPopulateEnv);
}


module.exports = function(econfFile) {
	econfFile = econfFile || process.cwd() + '/.econf.js';
	
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
}