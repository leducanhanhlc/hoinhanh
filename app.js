var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();
var firebase = require('./database/firebase');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index.index);
app.use('/users', users);
app.use('/admin', admin.admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function add(_id) {
    admin.add(_id);
}

function pop(_id) {
    admin.pop(_id);
}

function setid(id) {
    return index.setid(String(id)); //chuyen? index.id sang ben nay` nay`
}

function getcontent(_content) {
    admin.getcontent(_content);
}

function getautomode() {
    return admin.getautomode();
}

function save(data) {
    firebase.save(data);
}

function answer(str) {
    return firebase.answer(str);
}


function retrievfirebasedata() {
    firebase.retrievfirebasedata();
}
exports.app = app;
exports.add = add;
exports.pop = pop;
exports.setid = setid;
exports.getcontent = getcontent;
exports.getautomode = getautomode;
exports.answer = answer;
exports.retrievfirebasedata = retrievfirebasedata;