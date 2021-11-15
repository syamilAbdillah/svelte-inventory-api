const router = require('express').Router()
const productModel = require('../../models').product

const createProduct = require('./createProduct')(productModel)
const getProducts = require('./getProducts')(productModel)
const updateProduct = require('./updateProduct')(productModel)
const deleteProduct = require('./deleteProduct')(productModel)

router.post('/', createProduct)
router.get('/', getProducts)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router