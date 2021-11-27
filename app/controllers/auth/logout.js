module.exports = (refreshTokenModel) => async (req, res) => {
	try {
		const deletedToken = await refreshTokenModel.destroy({
			where: {
				userId: req.user.id
			}
		})

		res.status(200)
		res.json({
			status: 200,
			message: 'your "refresh-token" is deleted'
		})	
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'fucek'
		})
	}
}