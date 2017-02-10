/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./dev_env');
// var test = require('./test_env');
// var production = require('./prod_env');
var defaults = {
	root: path.normalize(__dirname + '/../'),

};



/**
 * Expose
 */

module.exports = {
	development: extend(development, defaults),
	// test: extend(test, defaults),
	// production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];