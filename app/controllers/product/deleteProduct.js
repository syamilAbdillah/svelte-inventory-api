module.exports = productModel => async (req, res) => {
	try {
		const deleteProduct = await productModel.destroy({
			where: { id: req.params.id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: 'success delete a product'
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to delete a product',
			error: error
		})
	}	
}