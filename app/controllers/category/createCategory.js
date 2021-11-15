module.exports = (categoryModel) => async (req, res) => {
	try {

		const createdCategory = await categoryModel.create({
			name: req.body.name
		})

		res.status(201)
		res.json({
			status: 201,
			message: 'success create new category',
			data: createdCategory
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to create new category',
			error: error
		})
	}
}