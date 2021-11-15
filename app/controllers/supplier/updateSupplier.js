module.exports = supplierModel => async (req, res) => {
	const supplierDTO = {
		name: req.body.name,
		email: req.body.email,
		address: req.body.address,
		phone: req.body.phone
	}

	try {
		const [updatedSupplier] = await supplierModel.update(supplierDTO, {
			where: { id: req.params.id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: `success update a supplier, affected record => ${updatedSupplier}`
		})
	} catch(error) {
		console.log(error)
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to update supplier'
		})
	}
}