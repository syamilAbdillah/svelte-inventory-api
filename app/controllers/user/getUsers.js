module.exports = (userModel) => async (req, res) => {
	try {
		const users = await userModel.findAll({
			fields: ['id', 'name', 'email', 'role', 'createdAt']
		})
		
		res.status(200)
		res.json({
			status: 200,
			message: 'success get list of users',
			data: users
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'server down',
			error: error.errors[0].message
		})
	}
}