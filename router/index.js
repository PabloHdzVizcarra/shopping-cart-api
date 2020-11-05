const express = require('express');
const router = express.Router()
const handlersArticles = require('../controllers/handler-articles')
require('../config')

module.exports = () => {

  router.get('/api', handlersArticles.getAllArticles)
  router.post('/api/add-product-cart', handlersArticles.addProductCart)
  router.get('/api/all-products-cart', handlersArticles.getAllProductsCart)
  router.delete('/api/delete-product', handlersArticles.deleteOneProductById)

  router.post('/api/auth/login-user', handlersArticles.loginUser)
  router.get('/api/auth/verify-user/:token', handlersArticles.verifyUser)
  router.post('/api/auth/register-user', handlersArticles.registerUser)

  return router
}