const router = require('express').Router()
const categoryModel = require('../../models').category

const createCategory = require('./createCategory')(categoryModel)
const getCategories = require('./getCategories')(categoryModel)
const updateCategory = require('./updateCategory')(categoryModel)
const deleteCategory = require('./deleteCategory')(categoryModel)

router.post('/', createCategory)
router.get('/', getCategories)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router