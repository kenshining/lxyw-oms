var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var config=require('./config/config.json');
var routes = require('./routes/index');

var app = express();


//log4jsConfigration
var log4js = require('log4js');
log4js.configure(config.log4js);
var log = log4js.getLogger('logInfo');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);


//connect to redits to configrate session state
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
// session configerations
app.use(session({
  store: new RedisStore({
    host: config.redisConfig.host,
    port: config.redisConfig.post
  }),
  secret: 'cookie-parser',
  //session invalid configeration
  cookie: {maxAge: 60000*60*24*config.redisConfig.sessionDay },
  resave:true,
  saveUninitialized:false
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//引用过滤器
var filters = require('./services/SystemFilter');
filters(app,log);

//引用路由
routes(app,log);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
