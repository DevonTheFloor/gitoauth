const express = require('express')
const app = express()
// const axios = require('axios')
const request = require('superagent')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.get('/login/github/', (req, res, next) => {
  const code = req.query.code
  console.log('code:', code)
  if (!code) {
    return res.send({
      success: false,
      message: 'No Code'
    })
  } else {
    request
      .post('https://github.com/login/oauth/access_token')
      .send({
        client_id: '485307765a002578a888',
        client_secret: 'c9e6780bbfb45decb41cabc5ca4b5497d426c4a3',
        code
      })
      .set('Accept', 'application/json')
      .then((res) => {
        console.log('token :', res.body.access_token)
        const data = res.body.access_token
        res.send(data)
      })
  }
})

// http://localhost:3000/seedata?error=redirect_uri_mismatch&error_description=The%20redirect_uri%20MUST%20match%20the%20registered%20callback%20URL%20for%20this%20application.&error_uri=https%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-authorization-request-errors%2F%23redirect-uri-mismatch
module.exports = app
