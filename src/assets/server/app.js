let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
let Patharr = __dirname.toString().split("\\");
let myPath = Patharr.slice(0,Patharr.length-2).join('/');
app.use(express.static(myPath));

app.get('/*', function (req, res) {
  res.sendFile(path.join(myPath,'index.html'))
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env== development'))
{
  app.listen(3000, function () {
    console.log('Example listening on port 3000!');
  });
} else{
  app.listen(8080, function () {
    console.log('Example listening on port 8080!');
  });
}
module.exports = app;
