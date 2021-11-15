module.exports = (stockModel, Op) => async (req, res) => {
	try {
		const stockIncs = await stockModel.findAll({
			attributes:['id', 'date','desc', 'code', 'qty'],
			where: {
				code: {
					[Op.startsWith]: 'BGM'
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
			message: 'success get list of stock increase',
			data: stockIncs
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