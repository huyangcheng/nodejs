var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		console.log("开始请求.");
		
		var pathname = url.parse(request.url).pathname;
		console.log(pathname);
		// request.setEncoding("utf-8");
		// var postData = "";
		// request.addListener("data", function(postDataChunk){
		// 	postData += postDataChunk;
		// 	console.log("获取到数据："+postDataChunk);
		// });

		// request.addListener("end", function(){
		// 	route(handle, pathname, response, postData);
		// });
		
		route(handle, pathname, response, response);

		// response.writeHead(200, {"Content-Type":"text/plain"});//设置返回状态码以及其他头信息
		// response.write(content);//输出返回
		// response.end();//返回结束，不结束将用一直处于请求状态

		console.log("=====================================");
	}
	http.createServer(onRequest).listen(6339);
	console.log("服务搭建完成。");
}

exports.start = start;
