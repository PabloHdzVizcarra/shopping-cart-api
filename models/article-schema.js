const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  name: String,
  price: Number,
})

const ArticleCart = mongoose.model('ArticleCart', articleSchema)

module.exports = {
  ArticleCart
}