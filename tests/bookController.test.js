/**
 * Created by nazarlesiv on 9/20/15.
 */
var should = require('should'),
  sinon = require('sinon');

describe('Book Controller Tests', function(){
  describe('Post', function() {
    it('should not allow an empty title on post', function() {
      var Book = function(book){
        this.save= function(){}
      };

      var req = {
        body: {
          author: 'Test'
        }
      };
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args);
      res.send.calledWith('Title is Required').should.equal(true);
    })
  })
});