
require('http').createServer(function (req, res) {
	var session = require('yasession')(req, res, {'dir':'/tmp'});
	if(!session.counter) session.counter = 0;
	session.counter++;
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\nThis is your ' + session.counter + " visit here.");
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
