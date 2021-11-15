module.exports = (categoryModel) => async (req, res) => {
	try {
		const categories = await categoryModel.findAll()

		res.status(200)
		res.json({
			status: 200,
			message: 'success get list of categories',
			data: categories
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to get list of categories',
			error: error
		})
	}
}