const router = require('express').Router()
const privateRouter = require('express').Router()
const publicRouter = require('express').Router()
const userController = require('./user')
const unitController = require('./unit')
const authController = require('./auth')

const userModel = require('../models').user
const verifyToken = require('./auth/verifyTokenMiddleware')(userModel)

publicRouter.use('/user', authController)

privateRouter.use('/user', verifyToken, userController)
privateRouter.use('/unit', unitController)


router.use(publicRouter)
router.use(verifyToken, privateRouter)

module.exports = router