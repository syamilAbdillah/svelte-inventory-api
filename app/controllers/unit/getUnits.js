module.exports = (unitModel) => async (req, res) => {
	try {
		const units = await unitModel.findAll()

		res.status(200)
		res.json({
			status: 200,
			message: 'get list of "unit"',
			data: units
		})
	} catch(error) {
		console.log({error})
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to get list of "unit"',
			error: error
		})
	}
}