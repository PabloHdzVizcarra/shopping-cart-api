const mongoose = require('mongoose')
const { Schema } = mongoose
const collectionName = 'user_accounts'

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  }
})

const UsersAuthSchema = mongoose.model('usersAuth', usersSchema, collectionName)

module.exports = {
  UsersAuthSchema
}