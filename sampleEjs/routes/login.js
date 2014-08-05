var express = require('express'),
	crypto = require('crypto'),
	router = express.Router(),
	User = require('../models/User.js'),
	TITLE = '登录';

router.get('/', function(req, res) {
	if (req.cookies.islogin) {
		req.session.userName = req.cookies.islogin;
	}
	if (req.session.userName) {
		res.redirect('/');
	}
	res.render('login', {
		title: TITLE
	});
});

router.post('/', function(req, res) {
	var userName = req.body['txtUserName'],
		userPass = req.body['txtUserPass'],
		isRem = req.body['chbRem'],
		md5 = crypto.createHash('md5');
	User.getUserByUserName(userName, function(err, result) {
		if (result == '') {
			res.locals.error = '用户不存在';
			res.render('login', {
				title: TITLE
			});
			return;
		}
		//将密码进行加密
		userPass = md5.update(userPass).digest('hex');
		if (result[0].UserName != userName || result[0].UserPass != userPass) {
			res.locals.error = '用户名或密码错误';
			res.render('login', {
				title: TITLE
			});
			return;
		}
		if (isRem) {
			res.cookie('islogin', userName, {
				maxAge: 60000
			});
		}
		res.locals.userName = userName;
		req.session.userName = res.locals.userName;
		res.redirect('/');

	});

});
module.exports = router;