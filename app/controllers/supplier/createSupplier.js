module.exports = supplierModel => async (req, res) => {
	const supplierDTO = {
		name: req.body.name,
		email: req.body.email,
		address: req.body.address,
		phone: req.body.phone
	}

	try {
		const latestSupplier = await supplierModel.findOne({
			attributes: ['code'],
			order: [['code', 'DESC']],
		})


		let code 
		if(latestSupplier){
			const orderNumber = latestSupplier.code.split('-')[1]
			code = `SUPP-${(orderNumber * 1) + 1}`
		} else {
			code = `SUPP-${1}`
		}

		supplierDTO.code = code
		const createdSupplier = await supplierModel.create(supplierDTO)

		res.status(201)
		res.json({
			status: 201,
			message: 'success create new supplier',
			data: createdSupplier
		})
		
	} catch(error) {
		console.log(error)

		res.status(500)
		res.json({
			status: 500,
			message: 'failed to create new supplier',
			error: error
		})
	}
}