const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  admin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
const ArticleSchema = mongoose.model('articleSchema', articleSchema, 'articles')

const getAllDataFromArticleSchema = async () => {
  try {
    const data = await ArticleSchema.find({})
    return {
      error: false,
      message: 'data obtained successfully from the database',
      data: data,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
      data: [],
    }
  }
}

const createNewArticleUsingSchema = async data => {
  try {
    const result = new ArticleSchema(data)
    await result.save()

    return {
      error: false,
      message: 'save in database correctly',
      data: data,
    }
  } catch (error) {
    return {
      error: true,
    }
  }
}

module.exports = {
  ArticleSchema,
  getAllDataFromArticleSchema,
  createNewArticleUsingSchema,
}
