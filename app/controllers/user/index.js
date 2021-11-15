const router = require('express').Router()
const bcrypt = require('bcrypt')
const userModel = require('../../models').user
const getUsersFactory = require('./getUsers')
const createUserFactory = require('./createUser')
const getUserByIdFactory = require('./getUserById')
const updateUserFactory = require('./updateUser')
const deleteUserFactory = require('./deleteUser')
const authController = require('../auth')

router.get('/', getUsersFactory(userModel))
router.get('/:id', getUserByIdFactory(userModel))
router.post('/', createUserFactory(userModel, bcrypt))
router.put('/:id', updateUserFactory(userModel))
router.delete('/:id', deleteUserFactory(userModel))
router.use(authController)

module.exports = router