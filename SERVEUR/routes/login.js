const express = require('express')
const router = express.Router()
const githubCtrlr = require('../controllers/github')

router.get('/github/', githubCtrlr.getUser)

module.exports = router
