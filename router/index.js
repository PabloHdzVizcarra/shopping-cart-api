const express = require('express');
const router = express.Router()
const handlersArticles = require('../controllers/handler-articles/handler-articles')
const handlerAuth = require('../controllers/handler-auth/handler-auth')
const config = require('../config')
const jwtExpress = require('express-jwt')

module.exports = () => {

  router.get('/api', handlersArticles.init)
  router.post('/api/add-product-cart', handlersArticles.addProductCart)
  router.delete('/api/delete-product', handlersArticles.deleteOneProductById)
  router.get('/api/all-products-cart',
    jwtExpress({
      secret: config.KEY_JWT,
      getToken:  req => req.cookies.token,
      algorithms: ['HS256']
    }),
    handlersArticles.getAllProductsCart
  )

  router.post('/api/auth/login-user', handlerAuth.loginUser)
  router.get('/api/auth/verify-user', handlerAuth.verifyUser)
  router.post('/api/auth/register-user', handlerAuth.registerUser)
  
  router.post('/api/v1/admin-users', handlerAuth.adminUsers)
  router.post('/api/v1/create-admin-users', handlerAuth.createAdminUsers)
  router.post('/api/v1/admin-users/save-article', handlerAuth.saveArticle)

  return router
}