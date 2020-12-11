const mongoose = require('mongoose')

const logerSchema = mongoose.Schema({
  login: { type: String },
  avatarUrl: { type: String }
})

module.exports = mongoose.model('Loger', logerSchema)
