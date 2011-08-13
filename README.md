
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
