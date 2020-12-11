const axios = require('axios')
const Loger = require('../models/loger')

exports.getUser = async (req, res, next) => {
  const code = req.query.code
  let accessToken
  console.log('code :', code)
  console.log('Coucou github js 4')
  await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token',
    headers: {},
    data: {
      client_id: '485307765a002578a888',
      client_secret: 'c9e6780bbfb45decb41cabc5ca4b5497d426c4a3',
      redirect_uri: 'http://localhost:2222/login/github/',
      scope: 'user',
      code
    }
  })
    .then((res) => {
      console.log('res : ', res.data)
      const text = res.data
      const params = new URLSearchParams(text)
      accessToken = params.get('access_token')
      return accessToken
    })
    .catch(error => console.log(error))
  console.log('token :', accessToken)

  let login
  let avatarUrl
  let userId
  await axios({
    method: 'get',
    url: 'https://api.github.com/user',
    headers: {
      Authorization: 'bearer ' + accessToken
    }
  })
    .then((res) => {
      console.log('resData: ', res.data)
      login = res.data.login
      avatarUrl = res.data.avatar_url
      userId = {
        login,
        avatarUrl
      }
      console.log('befor return : ', userId)
      return userId
    })
    .catch(error => console.log(error))
  console.log('userId :', userId)
  const loger = new Loger({
    login: userId.login,
    avatarUrl: userId.avatarUrl
  })
  Loger.findOne({ login: userId.login })
    .then((data) => {
      console.log(data)
      if (data.login) {
        console.log('datalogin :', data.login)
        res.redirect('http://localhost:3000/seedata')
      }
    })
    .catch(() => {
      loger.save({ login: userId.login, avatarUrl: userId.avatarUrl })
        .then(() => res.redirect('http://devonthefloor.free.fr'))
        .catch(() => res.status(201).json({
          message: 'cannot do this'
        }))
    })
}
