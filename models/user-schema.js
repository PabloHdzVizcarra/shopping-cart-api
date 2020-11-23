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
    required: true,
  },
})

const UsersAuthSchema = mongoose.model('usersAuth', usersSchema, collectionName)

const getUserByIDUsersSchema = async id => {
  try {
    await UsersAuthSchema.findById(id)
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  UsersAuthSchema,
  getUserByIDUsersSchema,
}
