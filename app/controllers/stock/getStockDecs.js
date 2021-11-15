module.exports = (stockModel, Op, Sequelize) => async (req, res) => {
	try {
		const stockDecs = await stockModel.findAll({
			attributes:['id', 'date', 'desc', 'code', [Sequelize.literal('qty * -1'), 'qty']],
			where: {
				code: {
					[Op.startsWith]: 'BGK'
				}
			},
			order: [['date', 'DESC']],
			include: [
				{ association: 'user', attributes: ['id', 'name', 'email'] },
				{ association: 'product', attributes: ['id', 'name', 'code'] }	
			]
		})

		res.status(200)
		res.json({
			status: 200,
			message: 'success get list of stock decrease',
			data: stockDecs
		})
	} catch(error) {
		console.log(error)

		res.status(500)
		res.json({
			status: 500,
			message: 'failed to get list of stock'
		})
	}
}