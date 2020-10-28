const express = require('express');
const app = express()
const router = require('./router')


app.use(express.static(__dirname + '/public'))
app.use("/", router())


app.use((req, res) => {
  res.status(404).send(`
    Error 404 - Sorry page not found
  `)
})


module.exports = app