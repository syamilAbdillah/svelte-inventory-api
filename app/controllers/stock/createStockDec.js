module.exports = (stockModel, Op) => async (req, res) => {
	const stockDecDTO = {
		date: new Date(req.body.date),
		qty: req.body.qty * -1,
		desc: req.body.desc,
		userId: req.user.id,
		productId: req.body.productId
	}

	try {
		const latestStockDec = await stockModel.findOne({
			where: {
				code: { [Op.startsWith]: 'BGK' }
			},
			attributes: ['code'],
			order: [['code', 'DESC']]
		})

		let code 
		if(latestStockDec){
			const orderNumber = latestStockDec.code.split('-')[1]
			code = `BGK-${(orderNumber * 1) + 1}`
		} else {
			code = `BGK-${1}`
		}

		stockDecDTO.code = code
		const createdStockDec = await stockModel.create(stockDecDTO)

		createdStockDec.qty = createdStockDec.qty * -1

		res.status(201)
		res.json({
			status: 201,
			message: 'success create new stock decrease',
			data: createdStockDec
		})
	} catch(error) {
		console.log(error)

		res.status(400)
		res.json({
			status: 400,
			message: 'failed to create new stock decrease'
		})
	}
}