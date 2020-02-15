var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const ContentModeratorAPIClient = require('azure-cognitiveservices-contentmoderator');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
// For use with web app and api call from field input
indexRouter.post('/api/grabtext', function(req, res){
  console.log("in /api/grabtext");
  const profile = req.body.profile;
  console.log(profile);

})

indexRouter.post('/api/text', function(req, res) {
  console.log("received request from extension!: " + req.body.text);
  let creds = new CognitiveServicesCredentials("08b28c9251ea4c0fb88f4fff6044f350");
  let client = new ContentModeratorAPIClient(creds, "https://tartanhackstest.cognitiveservices.azure.com/");
  client.textModeration.screenText('text/plain', req.body.text, (err, result, req, res) => {
  if (err) throw err;
  console.log(result.pII);
  });

  res.json([result.pII]);
});
// app.use('/api/text/', function(req, res) {
//   console.log("received request from extension!: " + req.body.text);
//   console.log("sending off " + JSON.stringify({message: 'hooray!'}));
//   res.status(200).json({"message": 'hooray!'});
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
