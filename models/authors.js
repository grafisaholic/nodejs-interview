const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  created_at: {
    type: Schema.Types.Date,
    default: new Date()
  },
  updated_at: {
    type: Schema.Types.Date
  }
})

module.exports = mongoose.model('AuthorSchema', AuthorSchema, 'authors')