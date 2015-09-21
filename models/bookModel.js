/**
 * Created by nazarlesiv on 9/20/15.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bookModel = new Schema({
  title: {
    type:String
  },
  author: {
    type:String
  },
  genre: {
    type:String
  },
  read: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', bookModel);