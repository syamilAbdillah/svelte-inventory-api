module.exports = (categoryModel) => async (req, res) => {
	try {
		const deletedCategory = await categoryModel.destroy({ 
			where: { id: req.params.id } 
		})

		res.status(200)
		res.json({
			status: 200,
			message: 'success delete a category'
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to delete category'
		})
	}
}