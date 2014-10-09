var http = require('http');

// Requires our config module
var config = require('./config');

var message = config.data.greeting + ' ' + config.env + '!\n'
    + config.data.text;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(message);
}).listen(config.port, '127.0.0.1');

console.log('Server running at port ' + config.port + ' in ' + config.env + ' environment');
console.log(config);