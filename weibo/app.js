var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//加载session
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');


var app = express();

var flash = require('connect-flash');
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var partials = require('express-partials');
app.use(partials());

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        db: settings.db
    })
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var error = req.flash('error');
  var success = req.flash('success');
   res.locals.error = error.length ? error : null;
  res.locals.success = success.length ? success : null;
  next();
});

app.use('/', routes);
app.use('/users', users);

app.listen(6339, function() {
    console.log('HTTP 服务器启动');
});

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