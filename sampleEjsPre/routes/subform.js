var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var username = req.query['username'],
		userpassword = req.query.userpassword;
	console.log('username:' + username);
	console.log('userpassword:' + userpassword);
	res.render('subform', {
		title: '提交表单以及接收参数示例',
		method: 'GET'
	});
});

router.post('/', function(req, res) {
	var username = req.body.username,
		userpassword = req.body.userpassword;
	console.log('POST提交进来了');
	console.log('username:' + username);
	console.log('userpassword:' + userpassword);
	res.render('subform', {
		title: '提交表单以及接收参数示例',
		method: 'POST'
	});
});

module.exports = router;