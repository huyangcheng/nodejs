var express = require('express'),
	crypto = require('crypto'),
	router = express.Router(),
	User = require('../models/user.js'), //加载User类
	TITLE = '注册';

router.get('/', function(req, res) {
	res.render('reg', {
		title: TITLE
	})
});

router.post('/', function(req, res) {
	var userName = req.body['txtUserName'],
		userPass = req.body['txtUserPass'],
		userRePass = req.body['txtUserRePass'],
		md5 = crypto.createHash('md5');
	userPass = md5.update(userPass).digest('hex');
	var newUser = new User({
			username: userName,
			userpass: userPass
		})
		//检查用户名是否存在
	User.getUserNumByName(newUser.username, function(err, result) {
		if (result != null && result[0]['Num'] > 0) {
			err = '用户名已存在！';
		}
		if (err) {

			res.locals.err = err;
			res.render('reg', {
				title: TITLE
			})
			return;
		}
		//保存用户
		newUser.save(function(err, result) {
			if (err) {
				res.locals.err = err;
				res.render('reg', {
					title: TITLE
				})
				return;
			}
			if (result.insertId > 0) {
				res.locals.success = '注册成功，<a class="btn btn-link" href="/login" role="button"> 登录 </a>';
			}

			res.render('reg', {
				title: TITLE
			})
		});
	});

});

module.exports = router;