const express = require('express');
const router = express.Router()
const handlersArticles = require('../controllers/handler-articles')

module.exports = () => {

  router.get('/api', handlersArticles.getAllArticles)
  router.post('/api/add-product-cart', handlersArticles.addProductCart)

  return router
}