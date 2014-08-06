var http = require('http'),
	querystring = require('querystring');
http.get({
	host: 'www.hao123.com'
}, function(res) {
	res.setEncoding('utf-8');
	res.on('data', function(data) {
		console.log(data);
	});
});