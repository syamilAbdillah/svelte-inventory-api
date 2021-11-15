module.exports = productModel => async (req, res) => {
	const productDTO = {
		name: req.body.name,
		supplierId: req.body.supplierId,
		categoryId: req.body.categoryId,
		unitId: req.body.unitId
	}

	try {
		const [updatedProduct] = await productModel.update(productDTO, {
			where: { id: req.params.id }
		})

		if(!updatedProduct) {
			res.status(400)
			res.json({
				status: 400,
				message: 'failed to update a product'
			})

			return
		}

		res.status(200)
		res.json({
			status: 200,
			message: `success update a product, affected record ${updatedProduct}`
		})
	} catch(error) {
		console.log(error)
		
		const statusCode = 
			error.name == 'SequelizeForeignKeyConstraintError'
			? 400: 500

		res.status(statusCode)
		res.json({
			status: statusCode,
			message: error.message || 'failed to update a product',
			error: {
				field: error.index?.split('_')[1]
			}
		})
	}	
}