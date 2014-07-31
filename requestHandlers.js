var exec = require("child_process").exec,
	querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function start(response, postData) {
	console.log("执行start程序。");

	 var body = '<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" '+
	    'content="text/html; charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    '<form action="/upload" enctype="multipart/form-data" '+
	    'method="post">'+
	    '<input type="file" name="upload">'+
	    '<input type="submit" value="上传文件" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
	
}

function upload(response, request) {
	console.log("执行upload程序。");

	var form = new formidable.IncomingForm();
	// form.uploadDir='tmp';
	form.parse(request);
    	
 //    	if(err) {
	// 		response.writeHead(500, {"Content-Type":"text/plain"});
	// 		response.write(err + "\n");
	// 		response.end();
	// 	}else{
	// 		response.writeHead(200 ,{"Content-Type":"text/plain"});
	// 		response.write(file, "binary");
	// 		response.end();
	// 	}
 //    	// fs.renameSync(files.upload.path, "tmp/test.jpg");
    
 //  	});

	response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
	// var form = new formidable.IncomingForm();
	// form.parse(request, function(error, fields, files) {
	// 	console.log("解析完成。");
	// 	fs.renameSync(files.upload.path, "tmp/test.jpg");
	// 	response.writeHead(200, {"Content-Type":"text/plain"});
	// 	response.write("<img src='/show' />");
	// 	response.end();
	// });
}

function show(response, postData) {
	console.log("执行show程序。");
	// fs.readFile("tmp/test.jpg", "binary", function(err ,file) {
	// 	if(err) {
	// 		response.writeHead(500, {"Content-Type":"text/plain"});
	// 		response.write(err + "\n");
	// 		response.end();
	// 	}else{
	// 		response.writeHead(200 ,{"Content-Type":"text/plain"});
	// 		response.write(file, "binary");
	// 		response.end();
	// 	}
	// });
}

function sleep(milliSeconds) {
	var startTime = new Date().getTime();
	while(new Date().getTime() < startTime+milliSeconds);
}

exports.start = start;
exports.upload = upload;
exports.show = show;