const router = require('express').Router()
const supplierModel = require('../../models').supplier 

const createSupplier = require('./createSupplier')(supplierModel)
const getSuppliers = require('./getSuppliers')(supplierModel)
const updateSupplier = require('./updateSupplier')(supplierModel)
const deleteSupplier = require('./deleteSupplier')(supplierModel)

router.post('/', createSupplier)
router.get('/', getSuppliers)
router.put('/:id', updateSupplier)
router.delete('/:id', deleteSupplier)

module.exports = router