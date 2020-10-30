const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  name: String,
  price: Number,
})

module.exports = mongoose.model('ArticleCart', articleSchema)