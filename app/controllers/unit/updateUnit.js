module.exports = (unitModel) => async (req, res) => {
	try {
		const updatedUnit = await unitModel.update({name: req.body.name}, {
			where: {
				id: req.params.id
			}
		})

		res.status(200)
		res.json({
			status: 200,
			message: `success update an unit, affected record => ${updatedUnit}`,
		})
	} catch(error) {
		console.log({error})
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to update an "unit"'
		})
	}
}