const router = require('express').Router()
const { Op } = require('sequelize')
const models = require('../../models')

router.get('/stats', async (req, res) => {
	try {
		const countedProduct = models.product.count()
		const countedUser = models.user.count()
		const countedStockInc = models.stock.count({
			where: {
				qty: { [Op.gt]: 0 }
			}
		})
		const countedStockDec = models.stock.count({
			where: {
				qty: { [Op.lt]: 0 }
			}
		})
		const promises = [countedProduct, countedUser, countedStockInc, countedStockDec]
		const [totalProduct, totalUser, totalStockInc, totalStockDec] = await Promise.all(promises)


		res.status(200)
		res.json({
			status: 200, 
			message: 'success get stats',
			data: {
				totalProduct, 
				totalUser, 
				totalStockInc, 
				totalStockDec
			}
		})
	} catch(error) {
		console.log(error)
		res.status(500)
		res.json({
			status: 500,
			error: error
		})
	}
})

module.exports = router