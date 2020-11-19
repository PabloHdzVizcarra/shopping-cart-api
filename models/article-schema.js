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

const getAllDataFromArticleSchema = async () => {
  try {
    const data = await ArticleSchema.find({})
    return ({
      error: false,
      message: 'data obtained successfully from the database',
      data: data
    })
  } catch (error) {
    return ({
      error: true,
      message: error.message,
      data: []
    })
  }
}

module.exports = {
  ArticleSchema,
  getAllDataFromArticleSchema
}