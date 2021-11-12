module.exports = (userModel) => async (req, res) => {
	const { id } = req.params

	try {
		const deletedUser = await userModel.destroy({
			where: { id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: `affected user ${deletedUser}`,
		})		
	} catch(error) {
		console.log({error})

		res.status(500)
		res.json({
			status: 500,
			message: 'server down',
			error: {error}
		})
	}
}