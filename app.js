const express = require('express');
const app = express()
const router = require('./router')
require('./database/mongoose')
const cors = require('cors')
const config = require('./config')


// app.use('key', config.KEY_JWT)
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(cors())

app.use("/", router())


app.use((req, res) => {
  res.status(404).send(`
    Error 404 - Sorry page not found
  `)
})

module.exports = app
