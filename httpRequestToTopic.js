/*
	构造HTTP 请求向专题注册接口发送数据
	难点：
		发送数据中需要在请求头中将编码设置为GB2312不然服务器接收为乱码
		专题服务器响应编码为GB2312，nodejs中的res中无法直接设置需要借用外部模块

*/


var http = require('http'),
	querystring = require('querystring'),
	iconv = require('iconv-lite'),
	BufferHelper = require('bufferhelper'),
	//构造请求信息
	contents = querystring.stringify({
		surname: '胡',
		name: '杨成',
		mobile: '13521034457',
		aprovincename: 'H 河南',
		acityname: 'X 许昌'
	}),
	//设置请求参数
	options = {
		host: 'topic.autohome.com.cn',
		path: '/2014/8/mini/ajax/savedata.ashx',
		// path: '/2013/webserver/autoform/handler/savedata.ashx?t=1010',
		method: 'get',
		headers: {
			'Referer': 'http://topic.autohome.com.cn/2014/8/mini/',
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', //设置请求编码
			'Content-Length': contents.length
		}
	};


//GET 实现
http.get({
	host: 'topic.autohome.com.cn',
	path: '/2014/8/mini/ajax/savedata.ashx?' + contents,
	headers: {
		'Referer': 'http://topic.autohome.com.cn/2014/8/mini/',
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', //设置请求编码
	}
}, function(res) {
	var bufferHelper = new BufferHelper();
	//数据块，每次接收一块数据
	res.on('data', function(chunk) {
		bufferHelper.concat(chunk);
	});
	//数据接收完毕
	res.on('end', function() {
		console.log(iconv.decode(bufferHelper.toBuffer(), 'GB2312'));
	});
}).on('error', function(err) {
	console.log(err);
});


//request方法实现
function request() {
	var req = http.request(options, function(res) {
		// res.setEncoding('utf8');

		var bufferHelper = new BufferHelper();
		//数据块，每次接收一块数据
		res.on('data', function(chunk) {
			bufferHelper.concat(chunk);
		});
		//数据接收完毕
		res.on('end', function() {
			console.log(iconv.decode(bufferHelper.toBuffer(), 'GB2312'));
		});


	});

	req.on('error', function(err) {
		console.log(err);
	});
	//写入请求内容
	req.write(contents);
	req.end();
}