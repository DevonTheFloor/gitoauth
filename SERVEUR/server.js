
const http = require('http')
const app = require('./app')
const portnb = 2222

app.set('port', process.env.PORT || portnb)
const server = http.createServer(app)
console.log(`connecté port ${portnb}`)

server.listen(process.env.PORT || portnb)
