var express = require('express');
var router = express.Router();
var crypto = require('crypto');
router.get('/', function(req, res) {
	res.render('usecrypto', {
		title: '使用usecrypto示例'
	});
});

router.post('/', function(req, res) {
	var username = req.body.username,
		userpassword = req.body.userpassword;
	console.log('POST请求进来了');
	var md5 = crypto.createHash('MD5');
	var en_pwd = md5.update(userpassword).digest('hex');
	console.log('源密码' + userpassword +',加密后的密码：' +en_pwd);
	res.render('usecrypto', {
		title: '使用usecrypto示例'
	})
});

module.exports = router;