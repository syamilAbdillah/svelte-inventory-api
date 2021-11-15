module.exports = (jwt, userModel) => (req, res, next) => {
	
	const accessToken = req.headers.authorization.split(' ')[1]

	try	{
		jwt.varify(accessToken, 'myAccessTokenSecretKey', async (error, user) => {
			if(error) {
				res.status(401)
				res.json({
					status: 401,
					message: 'unauthorize'
				})

				return
			}

			const isValidUser = await userModel.findByPk(user.id)

			if(!isValidUser) {
				res.status(403)
				res.json({
					status: 403,
					message: 'forbidden'
				})

				return
			}

			req.user = isValidUser
			next()
		})
	} catch(error) {
		nex(error)
	}
}