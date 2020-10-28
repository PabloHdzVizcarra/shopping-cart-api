const express = require('express');
const router = express.Router()
const handlersArticles = require('../controllers/articles')

module.exports = () => {

  router.get('/api/', handlersArticles.getAllArticles)

  return router
}