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
    required: true
  },
  urlImage: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model(
  'articleCart',
  articleSchema,
  'list_articles'
)