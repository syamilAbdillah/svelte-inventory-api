const http = require('http')
const app = require('./app/app')
const { sequelize } = require('./app/models')

const PORT = process.env.PORT || 5000

const server = http.createServer(app)
server.listen(PORT)
server.on('listening', () => {
	console.log(`listening on port:${PORT}`)
	sequelize.authenticate().then(() => console.log('db connected'))
})