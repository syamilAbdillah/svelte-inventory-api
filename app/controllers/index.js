const router = require('express').Router()
const privateRouter = require('express').Router()
const publicRouter = require('express').Router()
const userController = require('./user')
const unitController = require('./unit')
const authController = require('./auth')
const categoryController = require('./category')
const supplierController = require('./supplier')
const productController = require('./product')
const stockController = require('./stock')

const userModel = require('../models').user
const verifyToken = require('./auth/verifyTokenMiddleware')(userModel)

publicRouter.use('/user', authController)

publicRouter.use('/user', userController)
privateRouter.use('/unit', unitController)
privateRouter.use('/category', categoryController)
privateRouter.use('/supplier', supplierController)
privateRouter.use('/product', productController)
privateRouter.use('/stock', stockController)

router.use(publicRouter)
router.use(verifyToken, privateRouter)

module.exports = router