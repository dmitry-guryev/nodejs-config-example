// Gets environment (default value: development)
var NODE_ENV = process.env.NODE_ENV || 'development';

// Returns specific config object
var config = module.exports = require('./' + NODE_ENV);

// Adds environment param
config.env = NODE_ENV;