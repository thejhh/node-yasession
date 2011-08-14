
Yet another session implementation for Node.js
==============================================

Description
-----------

This is a yet another session implementation for Node.js.

I know that there's a lot of Session modules for Node.js but I failed to find 
one like [Cookies](https://github.com/jed/cookies/) that was keep-it-simple and 
standalone.

Currently the module saves sessions to the filesystem but that should be 
changed to use some kind of plugable storing method.

Installation
------------

Simplest way to install is to use [npm](http://npmjs.org/), just simply `npm install yasession`.

License
-------

MIT-style license, see [INSTALL.txt](http://github.com/jheusala/node-yasession/blob/master/LICENSE.txt).

Example Code
------------

	require('http').createServer(function (req, res) {
		
		var session = require('yasession')(req, res, {'dir':'/tmp'});
		if(!session.counter) session.counter = 0;
		session.counter++;
		
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello World\nThis is your ' + session.counter + " visit here.");
		
	}).listen(1337, "127.0.0.1");
	console.log('Server running at http://127.0.0.1:1337/');

yasession(request, response, options)
----------------------------

### request

Standard Node.js HTTP/HTTPS request object.

### response

Standard Node.js HTTP/HTTPS response object.

### options.debug

If `true` then additional debug messages are printed with `util.log`. Default is `false`.

### options.cookie

Cookie name. Default is `YASESS`.

### options.domain

Optional domain setting for cookies.

### options.prefix

Prefix for session files. Default is `sess`.

### options.dir

Directory where to save JSON files. Default is `./tmp/cookies`.

### options.useStandardJSON

By default `yasession` is using 
[json-object](https://github.com/jheusala/node-json-object) to parse and 
stringify JSON. This can be changed by turning this option to `false`.
