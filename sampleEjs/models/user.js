var mysql = require('mysql');
var dbName = 'nodesample';

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root'
});

//监听连接事件
pool.on('connection', function(connection) {
	connection.query('Set Session auto_increment_increment=1');

});
//创建user类
function User(user) {
	this.username = user.username;
	this.userpass = user.userpass;
}
//将User暴露
module.exports = User;

pool.getConnection(function(err, connection) {
	var useDbSql = 'USE ' + dbName;
	connection.query(useDbSql, function(err) {
		if (err) {
			console.log('USER Error：' + err.message);
			return;
		}
		// console.log('User Succeed');
	});

	//添加数据
	User.prototype.save = function save(callback) {
		var user = {
			username: this.username,
			userpass: this.userpass
		};

		var insertUserSql = 'Insert Into UserInfo (Id, UserName, UserPass) Values (0, ?, ?);';
		connection.query(insertUserSql, [user.username, user.userpass], function(err, result) {
			if (err) {
				console.log('添加数据错误：' + err);
				return;
			}
			// connection.release();
			console.log("调用了添加用户！");
			callback(err, result);
		});
	};

	//根据用户名获取用户数量
	User.getUserNumByName = function getUserNumByName(username, callback) {
		var getUserNumByNameSql = 'Select Count(1) As Num From UserInfo Where username = ?';
		connection.query(getUserNumByNameSql, [username], function(err, result) {
			if (err) {
				console.log('根据用户名获取用户数量出错：' + err.message);
				return;
			}
			// connection.release();
			console.log('调用了根据用户名获取用户数量');
			callback(err, result);
		});

	}

	//根据用户名获取用户信息
	User.getUserByUserName = function getUserByUserName(username, callback) {
		var getUserByUserNameSql = 'Select * From UserInfo Where UserName = ?';
		connection.query(getUserByUserNameSql, [username], function(err, result) {
			if (err) {
				console.log('根据用户名获取用户信息出错：' + err);
				return;
			}
			// connection.release();
			console.log('调用了根据用户名获取用户信息');
			callback(err, result);
		});
	}
})