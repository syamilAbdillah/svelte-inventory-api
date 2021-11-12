module.exports = (userModel) => async (req, res) => {
	const { id } = req.params
	const { name, email, role } = req.body
	const userDTO = { name, email, role }
	
	try {
		const [updatedUser] = await userModel.update(userDTO, {
			where: { id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: `affected user ${updatedUser}`
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'server down',
			data: error
		})
	}
}