const router = require('express').Router()
const userController = require('./user')
const unitController = require('./unit')
const authController = require('./auth')

const userModel = require('../models').user
const verifyToken = require('./auth/verifyTokenMiddleware')(userModel)

router.use('/user', verifyToken, userController)
router.use('/user', authController)
router.use('/unit', unitController)

module.exports = router