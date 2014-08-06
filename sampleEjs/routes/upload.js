var
	TITLE = '文件上传',
	express = require('express'),
	router = express.Router(),
	formidable = require('formidable'),
	fs = require('fs'),
	FILE_UPLOAD_FOLDER = '/file/';

router.get('/', function(req, res) {
	res.render('upload', {
		title: TITLE
	});
});

router.post('/', function(req, res) {
	//创建上传表单
	var form = formidable.IncomingForm();
	//设置编码
	form.encoding = 'utf-8';
	//设置目录
	form.uploadDir = 'public' + FILE_UPLOAD_FOLDER;
	//保存后缀
	form.keepExtensions = true;
	//最大字节
	form.maxFieldsSize = 2 * 1024 * 1024;
	form.parse(req, function(err, fields, files) {
		if (err) {
			res.locals.err = err;
			res.render('upload', {
				title: TITLE
			});
			return;
		}

		var extName = '';
		switch (files.file.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}
		if (extName.length == 0) {
			res.locals.error = '只支持png和jpg格式图片';
			res.render('upload', {
				title: TITLE
			});
			return;
		}

		var fileName = Math.random() + '.' + extName;
		var newPath = form.uploadDir + fileName;

		//目录不存在将报错，后续优化
		fs.renameSync(files.file.path, newPath); //重命名
	});
	

	res.locals.success = '上传成功';
	res.render('upload', {
		title: TITLE
	});
});

module.exports = router;