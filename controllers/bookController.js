/**
 * Created by nazarlesiv on 9/20/15.
 */
var bookController = function(Book) {

  var post = function (req, res) {

    var book = new Book(req.body);

    if(!req.body.title){
      res.status(400);
      res.send('Title is Required');
    } else {
      book.save(function (err, data) {
        if (err) res.status(500).send(err);
        else {
          res.status(201);
          res.send(data);
        }
      });
    }
  };

  var get = function (req, res) {

    var query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, function (err, books) {
      //if error, send the proper status code.
      if (err) res.status(500).send(err)
      else {
        var returnBooks = [];
        books.forEach(function(val, i, arr) {
          var newBook = val.toJSON();
          newBook.links = {};
          newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
          returnBooks.push(newBook);
        });

        res.json(returnBooks);
      }
    });
  };

  return {
    post: post,
    get: get
  };
};

module.exports = bookController;