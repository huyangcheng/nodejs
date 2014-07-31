function route(handle, pathname, response, response) {
	console.log("这个请求的名称为："+pathname);
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, response);
	}else{
		console.log("没有"+pathname+"这个方法！");
    	response.writeHead(404, {"Content-Type": "text/plain"});
    	response.write("404 Not found");
    	response.end();
	}

}
exports.route = route;