/* Product Catalog */

var foreach = require('snippets').foreach,
    sys = require('sys'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
	Cookies = require('cookies');

/* Session builder */
module.exports = (function(req, res, options) {
	
	var options = options || {},
	    _debug = (options.debug === true) ? true : false,
	    _cookie_name = options.cookie || 'YASESS',
	    _cookie_dir = path.resolve(options.dir || './tmp/cookies'),
		_cookie_file_prefix = options.prefix || 'sess',
	    _cookie_domain = options.domain,
	    useStandardJSON = options.useStandardJSON ? true : false,
	    json = useStandardJSON ? JSON : require('json-object').setup(global);
	
	/* Create unique ID */
	function _create_id(length) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
		    length = length || 128,
		    out = '',
		    i=0;
		for (; i<length; i++) out += chars[Math.floor(Math.random() * chars.length)];
		return out;
	}
	
	/* Get filename for session */
	function _get_filename(session_id) {
		return path.resolve(_cookie_dir, _cookie_file_prefix + session_id + ".json");
	}
	
	/* Load session from file */
	function _load(id, file) {
		var file = file || _get_filename(id),
		    data = json.parse(fs.readFileSync(file)),
		    obj = new Session(id);
		foreach(data).do(function(v, k) {
			obj[k] = v;
		});
		return obj;
	}
	
	/* Save session to file */
	function _save(obj, file) {
		fs.writeFile(file, json.stringify(obj), function(err) {
			if(err) util.log("Session: Error: Could not write to `" + file + "`: " + err);
		});
		return obj;
	}
	
	/* Session object contructor */
	function Session(id) {
		if(!(this instanceof arguments.callee)) return new (arguments.callee)(key, name, values);
		var obj = this;
	}
	
	// Setup our session
	function _create() {
		var cookies = new Cookies(req, res),
		    url = require('url').parse(req.url),
		    cookie_id = cookies.get(_cookie_name),
		    id = cookie_id || _create_id(),
			filename = id && _get_filename(id),
		    obj = (cookie_id && path.existsSync(filename) ) ? _load(cookie_id, filename) : new Session(id),
			saved = false;
		
		if(!filename) throw new TypeError("filename invalid!");
		
		if(_debug) util.log("Session: " + sys.inspect(obj));
		
		// Set cookie
		if(_debug) util.log("Session: Setting cookie...");
		cookies.set(_cookie_name, id, {'domain':_cookie_domain});
		
		// Save the session data to file on end of request
		req.on('end', function() {
			if(saved) return;
			if(_debug) util.log("Session: Saving cookie to file `" + filename + "` on request end...");
			_save(obj, filename);
			saved = true;
		});
		
		req.on('close', function() {
			if(saved) return;
			if(_debug) util.log("Session: Saving cookie to file `" + filename + "` on request close...");
			_save(obj, filename);
			saved = true;
		});
		
		return obj;
	}
	
	return _create();
	
});

/* EOF */
