module.exports = (stockModel, Op) => async (req, res) => {
	const stockIncDTO = {
		date: new Date(req.body.date),
		qty: req.body.qty,
		desc: req.body.desc,
		userId: req.user.id,
		productId: req.body.productId
	}

	try {
		const latestStockInc = await stockModel.findOne({
			where: {
				code: { [Op.startsWith]: 'BGM' }
			},
			attributes: ['code'],
			order: [['code', 'DESC']]
		})

		let code 
		if(latestStockInc){
			const orderNumber = latestStockInc.code.split('-')[1]
			code = `BGM-${(orderNumber * 1) + 1}`
		} else {
			code = `BGM-${1}`
		}

		stockIncDTO.code = code
		const createdStockInc = await stockModel.create(stockIncDTO)

		res.status(201)
		res.json({
			status: 201,
			message: 'success create new stock-increase',
			data: createdStockInc
		})
	} catch(error) {
		console.log(error)

		res.status(400)
		res.json({
			status: 400,
			message: 'failed to create new stock increase'
		})
	}
}