const router = require('express').Router()
const userController = require('./user')

router.use('/user', userController)

module.exports = router