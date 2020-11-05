const express = require('express');
const router = express.Router()
const handlersArticles = require('../controllers/handler-articles')
require('../config')

module.exports = () => {

  router.get('/api', handlersArticles.getAllArticles)
  router.post('/api/add-product-cart', handlersArticles.addProductCart)
  router.post('/api/auth/login-user', handlersArticles.loginUser)
  router.post('/api/auth/register-user', handlersArticles.registerUser)
  router.get('/api/all-products-cart', handlersArticles.getAllProductsCart)
  router.delete('/api/delete-product', handlersArticles.deleteOneProductById)

  return router
}