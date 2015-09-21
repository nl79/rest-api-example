/**
 * Created by nazarlesiv on 9/20/15.
 */
var express = require('express');

var routes = function (Book) {

  var bookRouter = express.Router();

  //This is Using the "Revealing Module Pattern" which is useful for
  //testability.
  var bookController = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  //middleware
  bookRouter.use('/:bookId', function (req, res, next) {
    //get the book by ID
    Book.findById(req.params.bookId, function (err, book) {
      //if error, send the proper status code.
      if (err) res.status(500).send(err);
      else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send("no book found");
      }

    });
  });

  bookRouter.route('/:bookId')

    .get(function (req, res) {

      var returnBook = req.book.toJSON();
      returnBook.links = {};
      var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
      returnBook.links.filterByThisGenre = newLink.replace(' ', '%20');
      res.json(returnBook);
    })
    .put(function (req, res) {
      var book = req.book;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save(function(err, data) {
        if(err) { res.status(500).send(err); }
        else {
          res.json(data);
        }
      });


    })
    .patch(function(req, res) {
      //delete the ID
      if(req.body._id) {
        delete req.body._id;
      }

      for(var p in req.body){

        req.book[p] = req.body[p];
      }

      req.book.save(function(err, data) {
        if(err) { res.status(500).send(err); }
        else {
          res.json(data);
        }
      });

    })
    .delete(function(req, res) {
      req.book.remove(function(err, data) {
        if(err) { res.status(500).send(err); }
        else {
          res.status(204);
        }
      });
    });

  return bookRouter;
}

module.exports = routes;