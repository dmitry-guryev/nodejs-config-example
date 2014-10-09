// Config for production environment

// Inherited from development config
var config = module.exports = require('./development');

// Overrides some params
config.port = 3000;
config.data.greeting = 'Good morning';