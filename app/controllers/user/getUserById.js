module.exports = (userModel) => async (req, res) => {
	const { id } = req.params

	try {
		const user = await userModel.findByPk(id, {
			attributes: ['id', 'name', 'email', 'role', 'createdAt']
		})

		res.status(200)
		res.json({
			status: 200,
			message: `success get user with id:${user.id}`,
			data: user
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