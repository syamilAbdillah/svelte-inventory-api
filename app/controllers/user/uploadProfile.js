module.exports = userModel => async (req, res) => {
	try {
		if(!req.file) return res.status(400).json({status: 400, message: 'invalid file'})

		const [affectedRow] = await userModel.update(
			{ profile: req.file.path }, 
			{ where: { id: req.user.id } }
		)

		if(affectedRow) return res.status(201).json({ 
			status: 201, 
			message: 'success upload new profile',  
			profile: req.file.path
		})	
	} catch(error) {
		console.log(error)
		res.status(500)
		res.json({
			status: 500,
			message: 'something wrong with the server'
		})
	}
}