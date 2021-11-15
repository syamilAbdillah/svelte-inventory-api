module.exports = productModel => async (req, res) => {
	try {
		const products = await productModel.findAll({
			attributes: ['id','name','code'],
			include: [
				{ association: 'supplier', attributes: ['id', 'name'] },
				{ association: 'unit', attributes: ['id', 'name'] },
				{ association: 'category', attributes: ['id', 'name'] },
			], 
			order: [['code']]
		})

		res.status(200)
		res.json({
			status: 200,
			message: 'success get list of products',
			data: products
		})
	} catch(error) {
		console.log(error)

		res.status(500)
		res.json({
			status: 500,
			message: 'failed to get list of products',
			error: error
		})
	}	
}