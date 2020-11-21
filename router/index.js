const express = require('express')
const router = express.Router()
const handlersArticles = require('../controllers/handler-articles/handler-articles')
const handlerAuth = require('../controllers/handler-auth/handler-auth')
const {
  articleValidationRules,
  validateArticle
} = require('../controllers/handler-articles/validation/validator')
const { authenticatedToken } = require('../middleware/authenticate-token/authenticatedToken')
const { authUserById } = require('../middleware/autheticated-by-user-id/auth-user-by-id')

module.exports = () => {
  router.get('/api', handlersArticles.init)
  router.post('/api/add-product-cart', handlersArticles.addProductCart)
  router.delete('/api/delete-product', handlersArticles.deleteOneProductById)
  router.get('/api/all-products-cart',
    authenticatedToken,
    handlersArticles.getAllProductsCart
  )
  router.get('/api/v1/all-articles',
    authenticatedToken,
    handlersArticles.getAllArticles
  )

  router.post('/api/auth/login-user', handlerAuth.loginUser)
  router.get('/api/auth/verify-user', handlerAuth.verifyUser)
  router.post('/api/auth/register-user', handlerAuth.registerUser)
  router.post('/api/v1/log-admin-users', handlerAuth.adminUsers)
  router.post('/api/v1/create-admin-users', handlerAuth.createAdminUsers)

  router.post('/api/v1/admin/create-article',
    articleValidationRules(),
    validateArticle,
    authUserById,
    handlerAuth.saveArticle
  )

  return router
}
