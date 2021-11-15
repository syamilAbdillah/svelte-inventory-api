module.exports = supplierModel => async (req, res) => {
	try {
		const suppliers = await supplierModel.findAll()

		res.status(200)
		res.json({
			status: 200,
			message: 'success to create new supplier',
			data: suppliers
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