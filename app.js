var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var db;
if(process.env.ENV =='test') {
  db = mongoose.connect('mongodb://localhost/bookApi_test');
} else {
  db = mongoose.connect('mongodb://localhost/bookApi');
}

var port = process.env.PORT || 3000;
var app = express();
var Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function (req, res) {
  res.send('Welcome!! to my API');
});

app.listen(port, function () {
  console.log('Gulp is running on PORT: ' + port);
});

module.exports = app;