var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if (req.cookies.islogin) {
		req.session.userName = req.cookies.islogin;
		res.locals.userName = req.session.userName;
	}
	if (req.session.userName) {
		res.locals.userName = req.session.userName;
	} 
	res.render('index', {
		title: '主页'
	});
});

module.exports = router;