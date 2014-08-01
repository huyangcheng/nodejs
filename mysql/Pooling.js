var mysql = require('mysql');
var db_config = {
	host: 'localhost',
	user: 'root',
	database: 'nodesample'
};
//创建连接池
var pool = mysql.createPool(db_config);
//监听connection（连接）事件

pool.on('connection', function(connection) {
	connection.query('SET SESSION auto_increment_increment=1');
})

/*
//直接使用连接池
pool.query('Select 1 + 1 As solution', function(err, rows, fields) {
	if (err) throw err;
	console.log('查询结果：' + rows[0]);
})；
*/

pool.on('err', function() {
	console.log('err');
});

//共享连接池
pool.getConnection(function(err, connection) {
	if (err != null) {
		console.log("连接数据库出现错误！");
		return;
	}
	
	connection.query('Select * From UserInfo;', function(err, result) {
		console.log('查询结果：' + result[0].UserName);
		//使用完连接后将其放回此池子中
		// connection.release();
	});

	connection.query('Select * From UserInfo;', function(err, result) {
		console.log('查询结果：' + result[0].UserPass);
		connection.release();
	});
});

// pool.end();