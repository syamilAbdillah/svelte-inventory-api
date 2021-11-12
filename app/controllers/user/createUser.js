module.exports = (userModel, bcrypt) => async (req, res) => {
	const userDTO = req.body

	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(userDTO.password, salt)
		userDTO.password = hashedPassword
		
		const createdUser = await userModel.create(userDTO)

		const data = JSON.parse(JSON.stringify(createdUser))
		delete data.password

		res.status(201)
		res.json({
			status: 201,
			message: 'success create new user',
			data: data
		}) 
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'server down',
			error: error
		})
	}
} 