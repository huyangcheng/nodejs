//加载mysql模块
var mysql = require('mysql');
//创建连接
var connection = mysql.createConnection({
		host: 'localhost', //设置主机
		user: 'root', //设置用户
		port: '3306', //设置端口: 
		database: 'nodesample'
	})
	//打开连接
connection.connect(function(err) {
	if (err) {
		console.log('连接出错：' + err);
		return;
	}
	console.log('连接成功！');
});

//执行SQL
connection.query('Select 1 + 3 As solution',
	function(err, rows, fields) {
		if (err) {
			console.log('执行SQL出现错误' + err);
		} else {
			console.log(rows[0].solution + ':' + fields.length);
		}
	}
);

//增
var userAddSql = 'Insert Into UserInfo(Id,UserName,userPass) Values (0,?,?)';
var userAddSqlParams = ['huyangcheng', 'abcabc123123'];
connection.query(userAddSql, userAddSqlParams, function(err, result) {
	if (err) {
		console.log('添加数据出错' + err);
		return;
	}
	console.log('=================Insert================');
	console.log('返回：' + result.insertId);
	console.log('=======================================');
});

//改
var userUpdateSql = 'Update UserInfo Set UserName = ?,UserPass = ? Where Id= ?';
var userUpdateSqlParams = ['胡杨成', 'updateAbcabc123123', 3];
connection.query(userUpdateSql, userUpdateSqlParams, function(err, result) {
	if (err) {
		console.log('修改数据出错' + err);
		return;
	}
	console.log('=================Update================');
	console.log('返回：' + result.affectedRows);
	console.log('=======================================');

})

//查
var userGetSql = 'Select * From UserInfo';
connection.query(userGetSql, function(err, result) {
	if (err) {
		console.log('查询数据出错' + err);
		return;
	}
	console.log('=================Select================');
	console.log('返回：' + result.length);
	console.log('=======================================');
});

//删
var userDelSql = 'Delete From UserInfo';
connection.query(userDelSql, function(err, result) {
	if (err) {
		console.log('删除数据出错' + err);
		return;
	}
	console.log('=================Select================');
	console.log('返回：' + result.length);
	console.log('=======================================');
});

//调用存储过程
var userProc = 'Call p_UserInfo(?,?,?,@ExtReturnVal);';
var userProcParams = [0, 'ProcHuYangCheng', 'ProcAbcabc123123'];
connection.query(userProc, userProcParams, function(err, result) {
	if (err) {
		console.log('调用存储过程出错：' + err);
		return;
	}
	console.log('=================PROC==================');
	console.log(result);
	console.log(result[0][0].ExtReturnVal);
	console.log('=======================================');
})
connection.end();