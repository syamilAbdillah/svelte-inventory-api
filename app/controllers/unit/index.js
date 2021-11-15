const router 			= require('express').Router()
const unitModel 		= require('../../models').unit
const createUnitFactory = require('./createUnit')
const getUnitsFactory 	= require('./getUnits')
const updateUnitFactory = require('./updateUnit')
const deleteUnitFactory = require('./deleteUnit')

router.post('/', createUnitFactory(unitModel))
router.get('/', getUnitsFactory(unitModel))
router.put('/:id', updateUnitFactory(unitModel))
router.delete('/:id', deleteUnitFactory(unitModel))

module.exports = router