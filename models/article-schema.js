const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  admin: {
    type: String,
    required: true
  }
})

const ArticleSchema = mongoose.model('articleSchema', articleSchema, 'articles')
module.exports = ArticleSchema