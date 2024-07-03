const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksSchema = new Schema({
  title: {
    type: String
  },
  isbn: {
    type: String
  },
  published_at: {
    type: Schema.Types.Date
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "AuthorSchema"
  },
  created_at: {
    type: Schema.Types.Date,
    default: new Date()
  },
  updated_at: {
    type: Schema.Types.Date
  }
})

module.exports = mongoose.model('BooksSchema', BooksSchema, 'books')