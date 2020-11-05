const mongoose = require('mongoose')
const { Schema } = mongoose

const usersSchema = new Schema({
  email: String,
  password: String,
  username: String
})

const UsersAuthSchema = mongoose.model('usersAuth', usersSchema)

module.exports = {
  UsersAuthSchema
}