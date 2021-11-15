const { Sequelize, DataTypes } = require('sequelize')
const userFactory = require('./user')
const supplierFactory = require('./supplier')
const unitFactory = require('./unit')
const categoryFactory = require('./category')
const productFactory = require('./product')
const stockFactory = require('./stock')

// get connection
const sequelize = new Sequelize({
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	define: {
		freezeTableName: true
	}
}) 


// initialize model
const user = userFactory(sequelize, DataTypes)

const supplier = supplierFactory(sequelize, DataTypes)
const unit = unitFactory(sequelize, DataTypes)
const category = categoryFactory(sequelize, DataTypes)

const product = productFactory({
	sequelize, 
	DataTypes, 
	unit, 
	supplier, 
	category
})

const stock = stockFactory({
	sequelize,
	DataTypes,
	product,
	user
})


// defining relationship between model
supplier.hasMany(product)
unit.hasMany(product)
category.hasMany(product)

product.belongsTo(supplier)
product.belongsTo(unit)
product.belongsTo(category)

product.hasMany(stock)
user.hasMany(stock)

stock.belongsTo(product)
stock.belongsTo(user)



sequelize.sync()

module.exports = { 
	sequelize,
	user,
	supplier,
	unit,
	category,
	product,
	stock 
}