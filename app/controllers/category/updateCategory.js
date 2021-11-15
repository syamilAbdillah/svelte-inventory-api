module.exports = (categoryModel) => async (req, res) => {
	try {
		const [updatedCategory] = await categoryModel.update({ 
			name: req.body.name 
		}, 
		{
			where: { id: req.params.id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: `success to update category, affected record => ${updatedCategory}`
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 200,
			message: 'failed to update category'
		})
	}
}