var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: '<h1>个人首页</h1>',
		users: [{
			username: "胡杨成"
		}, {
			username: "梁勇生"
		}, {
			username: "董彩鹏"
		}]
	});
});

module.exports = router;