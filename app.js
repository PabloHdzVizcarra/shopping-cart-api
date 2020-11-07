const express = require('express');
const router = require('./router')
require('./database/mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.use("/", router())

app.use((req, res) => {
  res.status(404).send(`
    Error 404 - Sorry page not found
  `)
})

app.use((error, req, res, next) => {
  res.status(500).json({
    error: error,
    message: "Ocurrion un error del servidor"
  })
})

module.exports = app
