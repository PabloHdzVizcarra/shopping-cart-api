const express = require('express')
const protectedRoutes = express.Router()
protectedRoutes.use((req, res, next) => {
  const token = req.headers['access-token']
  console.log(token)
})