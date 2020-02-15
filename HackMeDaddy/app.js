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

let pp = function (js) {
  // console.log(js);
  var v;
  var elem;
  var l = []
  for (v in js.sSN) {
    var elem = js.sSN[v];
    //console.log(elem);
    l.push("SSN: " + elem.text);
  }
  for (v in js.iPA) {
    var elem = js.iPA[v];
    //console.log(elem);
    l.push("IP: " + elem.text);
  }
  for (v in js.phone) {
    var elem = js.phone[v];
    //console.log(elem);
    l.push("Phone: " + elem.text);
  }
  for (v in js.address) {
    var elem = js.address[v];
    //console.log(elem);
    l.push("Address: " + elem.text);
  }
  for (v in js.email) {
    var elem = js.email[v];
    //console.log(elem);
    l.push("Email: " + elem.text);
  }
  return l;
}

indexRouter.post('/api/text', function(req, res) {
  console.log("received request from extension!: " + req.body.text);
  let pii;
  let creds = new CognitiveServicesCredentials("08b28c9251ea4c0fb88f4fff6044f350");
  let client = new ContentModeratorAPIClient(creds, "https://tartanhackstest.cognitiveservices.azure.com/");
  client.textModeration.screenText('text/plain', req.body.text, (err, result, req, reqs) => {
  if (err) {res.json([]); return;}
  pii = result.pII;
  // console.log(result.pII);
  res.json(pii ? pp(pii) : []);
  });
});

let pows = function (url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'blob';
  request.onload = function() {
    var reader = new FileReader();
    reader.readAsDataURL(request.response);
    reader.onload =  function(e){
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
              const elem = document.createElement('canvas');
              elem.width = 200;
              elem.height = 200;
              const ctx = elem.getContext('2d');
              // img.width and img.height will contain the original dimensions
              ctx.drawImage(img, 0, 0, width, height);
              ctx.canvas.toBlob((blob) => {
                  const file = new File([blob], "fileName", {
                      type: 'image/jpeg',
                      lastModified: Date.now()
                  });
              }, 'image/jpeg', 1);
          },
          reader.onerror = error => console.log(error);
    };
  };
}

indexRouter.post('/api/img', function(req, res){
  let creds = new CognitiveServicesCredentials("08b28c9251ea4c0fb88f4fff6044f350");
  let client = new ContentModeratorAPIClient(creds, "https://tartanhackstest.cognitiveservices.azure.com/");
  console.log(req.body.text);
  client.imageModeration.oCRUrlInput('eng', "application/json", 
  {"dataRepresentation": "URL", "value": req.body.text}, (err, result, req, reqs) => {
  if (err) {res.send("false"); throw err;}
  console.log(result);
  var parse = result.text.replace(/(\r\n|\n|\r)/gm,"");
  console.log(parse);

    client.textModeration.screenText('text/plain', parse, (err, result, req, reqs) => {
      if (err) {res.json("false"); return;}
      let pii = result.pII;
      res.send(pii && (pii.sSN.length > 0 || pii.iPA.length > 0 || pii.phone.length > 0
        || pii.address.length > 0 || pii.email.length > 0) ? "true" : "false");
    });
  });
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
