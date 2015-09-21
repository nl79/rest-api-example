/**
 * Created by nazarlesiv on 9/20/15.
 */
var should = require('should'),
  request = require('supertest'),
  app = require('../app.js'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book'),
  agent = request.agent(app);

describe('Book CRUD Test', function() {
  it('should allow a book to be posted and return a read and _id', function(done) {
    var bookPost = {
      title: 'new book',
      author: 'Me',
      genre: 'History'
      };

    request(app).post('api/books')
      .set('Connection', 'keep-alive')
      .type('json')
      .send(bookPost)
      .expect(200).end(function(err, results) {
        console.log('error', err);
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach(function(done) {
    Book.remove().exec();
    done();
  });
});