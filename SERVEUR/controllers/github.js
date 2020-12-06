const fetch = require('node-fetch')

const clientId = '485307765a002578a888'
const clientSecret = 'c9e6780bbfb45decb41cabc5ca4b5497d426c4a3'
console.log({ clientId, clientSecret })

async function getAccessToken ({ code, clientId, clientSecret }) {
  const request = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      clientId,
      clientSecret,
      code
    })
  })
  const text = await request.text()
  const params = new URLSearchParams(text)
  return params.get('access_token')
}

async function fetchGitHubUser (token) {
  const request = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: 'bearer ' + token
    }
  })
  return await request.json()
}

exports.getUser = async (req, res) => {
  const code = req.query.code
  console.log('code :', code)
  const accessToken = await getAccessToken({ code, clientId, clientSecret })
  const user = await fetchGitHubUser(accessToken)
  console.log('token :', accessToken)

  if (user) {
    req.session.access_token = accessToken
    req.session.githubId = user.id
    res.redirect('http://localhost:3000/seedata')
  } else {
    res.send('Login did not succeed!')
  }
}
