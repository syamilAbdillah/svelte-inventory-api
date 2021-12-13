const router = require('express').Router()
const { Op, Sequelize } = require('sequelize')
const stockModel = require('../../models').stock

const createStockInc = require('./createStockInc')(stockModel, Op)
const getStockIncs = require('./getStockIncs')(stockModel, Op)
const updateStockInc = require('./updateStockInc')(stockModel)
const deleteStockInc = require('./deleteStockInc')(stockModel)

router.post('/inc', createStockInc)
router.get('/inc', getStockIncs)
router.put('/inc/:id', updateStockInc)
router.delete('/inc/:id', deleteStockInc)



const getStockDecs = require('./getStockDecs')(stockModel, Op, Sequelize)
const createStockDec = require('./createStockDec')(stockModel, Op)
const updateStockDec = require('./updateStockDec')(stockModel)
const deleteStockDec = require('./deleteStockDec')(stockModel)

router.post('/dec', createStockDec)
router.get('/dec', getStockDecs)
router.put('/dec/:id', updateStockDec)
router.delete('/dec/:id', deleteStockDec)

const sequelize = require('../../models').sequelize
const productModel = require('../../models').product
const report = require('./report')(productModel, sequelize)
router.get('/report', report)

module.exports = router