module.exports = productModel => async (req, res) => {
	const productDTO = {
		name: req.body.name,
		supplierId: req.body.supplierId,
		unitId: req.body.unitId,
		categoryId: req.body.categoryId
	}

	try {
		const latestProduct = await productModel.findOne({
			attributes: ['code'],
			order: [['code', 'DESC']],
		})


		let code 
		if(latestProduct){
			const orderNumber = latestProduct.code.split('-')[1]
			code = `BRG-${(orderNumber * 1) + 1}`
		} else {
			code = `BRG-${1}`
		}

		productDTO.code = code
		const createdProduct = await productModel.create(productDTO)

		res.status(201)
		res.json({
			status: 201,
			message: 'success create new product',
			data: createdProduct
		})

	} catch(error) {
		console.log(error)
		
		const statusCode = 
			error.name == 'SequelizeForeignKeyConstraintError'
			? 400: 500

		res.status(statusCode)
		res.json({
			status: statusCode,
			message: error.message || 'failed to create new product',
			error: {
				field: error.index?.split('_')[1]
			}
		})
	}	
}