module.exports = (unitModel) => async (req, res) => {
	try{
		const createdUnit = await unitModel.create({name: req.body.name})

		res.status(201)
		res.json({
			status: 201,
			message: 'success create new "unit"',
			data: createdUnit
		})
	}catch(error){
		console.log(error)
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to create new "unit"',
			error: error
		})
	}
}