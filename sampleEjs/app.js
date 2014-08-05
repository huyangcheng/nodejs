var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//加载session
var session = require('express-session');

//=================加载区域开始===================
//加载routes 模块区域，与下方use中匹配对应
var routes = require('./routes/index');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
var upload = require('./routes/upload');
//=================加载区域结束===================
var app = express();

//设置监听端口
app.listen(6339);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser()); //设置cookies
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser("huyangcheng"));
//设置session
app.use(session({
    secret: 'huyangcheng'
}));

//=================路由区域开始===================
app.use('/', routes);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/upload', upload);
//=================路由区域结束===================

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;