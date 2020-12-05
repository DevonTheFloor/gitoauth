const request = require('superagent')
// const user = require('../models/user')
// const User = require('../models/user')

exports.getUser = (req, res, next) => {
  console.log('step 1')
  const code = req.query.code
  console.log('code:', code)
  if (!code) {
    res.send({
      success: false,
      message: 'No Code'
    })
  } else {
    console.log('step 2')
    const userId = {}
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
        console.log(accessToken)
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
            .then(async (result) => {
              console.log('in da then result')
              console.log('in da getUserId')
              const datas = result.body
              const login = datas.login
              const avatarUrl = datas.avatar_url
              const userId = { login, avatarUrl }
              console.log('avUrl :', avatarUrl)
              console.log('login :', login)
              console.log('userId :', userId)
              return userId
            })
          console.log('out request, in else: ', userId)
        }
      })
  }
}

// }
// }

/* function searchUser (req, res, login, avatarUrl) {
  user.findOne({ login })
    .then(() => {
      if (login) {
        // res.redirect('http://localhost:3000/seedata')
      } else {
        recUser(req, res, login, avatarUrl)
      }
    })
    .catch(error => console.log(error))
}

function recUser (req, res, login, avatarUrl) {
  user.save(login, avatarUrl)
    .then(() => res.status(200).json({ message: 'Recorded!' }))
    .catch(error => console.log(error))
} */
