define(function() {
	var re = /([^&=]+)=?([^&]*)/g;
	var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
	var decode = function (str) {
		return decodeURIComponent( str.replace(decodeRE, " ") );
	};
	return function(url) {
		var i = url.indexOf('?');
		if(i == -1) return null;
		var query = url.substr(i+1),
			params = {}, e;
		while ( e = re.exec(query) ) { 
			var k = decode( e[1] ), v = decode( e[2] );
			if (k.substring(k.length - 2) === '[]') {
				k = k.substring(0, k.length - 2);
				(params[k] || (params[k] = [])).push(v);
			}
			else params[k] = v;
		}
		return params;
	};
});
