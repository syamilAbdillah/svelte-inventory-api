require('dotenv').config()
const express = require('express')
const cors = require('cors')
const controllers = require('./controllers')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
	exposedHeaders: '*'
}))
app.use('/static', express.static('static'))
app.use('/uploads', express.static('uploads'))

app.use(controllers)

module.exports = app