const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginFactory = require('./login')
const userModel = require('../../models').user


router.post('/login', loginFactory({jwt, bcrypt, userModel}))
router.delete('/logout', (req, res) => {})
router.get('/refresh-token', (req, res) => {})

module.exports = router