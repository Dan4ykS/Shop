const { Schema, model } = require('mongoose');
const path = require('path')
const { updateBooksList } = require('../utils/modelMethods');

const authors = new Schema({
  author: {
    type: String,
    required: true,
  },
  aboutAuthor: {
    type: String,
  },
  authorImg: {
    type: String,
    default: path.join('uploads', 'defaultAuthorImg.png'),
  },
  books: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Goods',
        required: true,
      },
    },
  ],
  booksCount: {
    type: Number,
    default: 0,
  },
});

authors.methods.updateBooksList = updateBooksList;

module.exports = model('Authors', authors);
