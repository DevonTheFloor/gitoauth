const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  login: { type: String },
  avatarUrl: { type: String }
})

module.exports = mongoose.model('User', userSchema)
