const router = require('express').Router()
const userController = require('./user')
const unitController = require('./unit')

router.use('/user', userController)
router.use('/unit', unitController)

module.exports = router