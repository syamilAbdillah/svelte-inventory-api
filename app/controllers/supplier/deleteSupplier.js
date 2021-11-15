module.exports = supplierModel => async (req, res) => {
	try {
		const deletedSupplier = await supplierModel.destroy({
			where: { id: req.params.id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: 'success delete a supplier'
		})
	} catch(error) {
		console.log(error)

		res.status(500)
		res.json({
			status: 500,
			message: 'failed to delete a supplier'
		})
	}
}