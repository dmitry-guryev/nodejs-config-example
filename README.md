Simple configuration pattern for Node.js app
============================================

How to define an environment?
-----------------------------
Just define the env variable (e.g. **NODE_ENV**) on process start:

```bash
$ NODE_ENV='production' node server.js
```

If you use [forever] or [pm2] to run your app, use this:

```sh
$ NODE_ENV='production' forever start server.js
```

```sh
$ NODE_ENV='production' pm2 start server.js
```

So you can access to this variable inside your app:

```javascript
// Gets environment (default value: development)
var NODE_ENV = process.env.NODE_ENV || 'development';
```

How to define and get specific configuration?
---------------------------------------------
Create a directory for your configuration files (e.g. **config/**), and create files for each of your environment (e.g. **development.js**, **production.js**, etc).

Here is an example of such file:

```javascript
var config = module.exports = {};

// Any params you wish, incl. arrays and objects
config.port = 1337;

config.db = {
    url: 'mongodb://...',
    prefix: 'db_'
};
```

Now you can use specific configuration for your environment:

```javascript
var NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('/path/to/config/' + NODE_ENV);

console.log('Server port: ' + config.port);
```
You can put this into your main script and use dependency injection to provide configuration for your modules.

Other way is to create a simple config module.

Just create **index.js** inside **config/** dir:

```javascript
// Gets environment (default value: development)
var NODE_ENV = process.env.NODE_ENV || 'development';

// Returns specific config object
var config = module.exports = require('./' + NODE_ENV);

// Adds environment param
config.env = NODE_ENV;
```

Now we can rewrite the previous code of main script:

```javascript
var config = require('/path/to/config');

console.log('Server port: ' + config.port);
```

And what about configuration inheritance?
----------------------------------
Of cause, we don't want to create all configurations from scratch. Better way is to use inheritance and overriding.

Here is an example how to do this:

```javascript
// Old version w/o inheritance
// var config = module.exports = {};

// Inherits development config
var config = module.exports = require('./development');

// Overrides some params
config.port = 3000;
config.data.greeting = 'Good morning';
```

That's all, it's too easy and obvious, but I hope it might be usefull for somebody :)

[forever]:https://github.com/nodejitsu/forever
[pm2]:https://github.com/Unitech/pm2