const mongoose = require('mongoose')
const { Schema } = mongoose
const collectionName = 'admin_users'

const adminUsersSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
})

const AdminUsersSchema = mongoose.model(
  'admin_users',
  adminUsersSchema,
  collectionName
)

module.exports = {
  AdminUsersSchema
}