const mongoose = require('mongoose')

const logerSchema = mongoose.Schema({
  user: { type: Object }
})

module.exports = mongoose.model('Loger', logerSchema)
