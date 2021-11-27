const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginFactory = require('./login')
const logoutFactory = require('./logout')
const refreshTokenFactory = require('./refresh-token')
const verifyTokenFactory = require('./verifyTokenMiddleware')
const userModel = require('../../models').user
const refreshTokenModel = require('../../models').refreshToken

const verifyToken = verifyTokenFactory(userModel)
router.delete('/logout', verifyToken, logoutFactory(refreshTokenModel))
router.post('/login', loginFactory({refreshTokenModel, userModel}))
router.get('/refresh-token', refreshTokenFactory({refreshTokenModel, userModel}))

module.exports = router