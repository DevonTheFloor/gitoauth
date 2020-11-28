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
  console.log('step 1')
  const code = req.query.code
  console.log('code:', code)
  if (!code) {
    return res.send({
      success: false,
      message: 'No Code'
    })
  } else {
    console.log('step 2')
    request
      .post('https://github.com/login/oauth/access_token')
      .send({
        client_id: '485307765a002578a888',
        client_secret: 'c9e6780bbfb45decb41cabc5ca4b5497d426c4a3',
        redirect_uri: 'http://localhost:2222/login/github/token/',
        scope: 'user',
        code
      })
      .set('Accept', 'application/json')
      .then((res) => {
        console.log('token :', res.body.access_token)
        const accessToken = res.body.access_token
        if (!accessToken) {
          res.send({
            message: 'No token find'
          })
        } else {
          console.log('step 3')
          request
            .get('https://api.github.com/user')
            .set('Authorization', 'bearer ' + accessToken)
            .set('Accept', 'application/json')
            .set('User-Agent', 'test_app')
            .then((result) => {
              console.log('type :', typeof (result.text))
              console.log('result: ', result.text)
            })
            .catch(error => console.log(error))
        }
      })
  }
})

// http://localhost:3000/seedata?error=redirect_uri_mismatch&error_description=The%20redirect_uri%20MUST%20match%20the%20registered%20callback%20URL%20for%20this%20application.&error_uri=https%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-authorization-request-errors%2F%23redirect-uri-mismatch
module.exports = app
