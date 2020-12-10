const express = require('express')
const app = express()
// const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const loginRoutes = require('./routes/login')
const User = require('./models/user')

mongoose.connect('mongodb+srv://Oim:Mot2PasseOimZi@dmin@clustermv.c2n3b.mongodb.net/rssflow?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion DBs OK'))
  .catch(() => console.log('Erreur connection DBs'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})
/* app.use(
  cookieSession({
    name: 'logged-session',
    secret: 'VERY_SECRET_COOKIE'
  })
) */

app.use('/login', loginRoutes)
app.use('/test/', (req, res, next) => {
  const user = new User()
  user.save({ login: 'testy', avatarUrl: 'http://coucou.ok' })
    .then(() => console.log('get ze database go!!'))
    .catch(error => console.log(error))
})

module.exports = app
