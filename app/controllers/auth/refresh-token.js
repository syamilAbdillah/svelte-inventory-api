const jwt = require('jsonwebtoken')

module.exports = ({refreshTokenModel, userModel}) => (req, res) => {
	if(!req.headers.authorization) {
		res.status(401)
		res.json({
			status: 401,
			message: 'unauthorize'
		})

		return
	}

	const refreshToken = req.headers.authorization.split(' ')[1]
	jwt.verify(refreshToken, process.env.SECRET_KEY_RT, async (error, user) => {
		if(error) {
			res.status(401)
			res.json({
				status: 401,
				message: 'unauthorize'
			})

			return
		}

		try {
			const isValidUser = await userModel.findByPk(user.id)
			const isValidToken = await refreshTokenModel.findOne({ 
				where: { 
					token: refreshToken, 
					userId: user.id 
				} 
			})

			if(!isValidUser || !isValidToken) {
				res.status(403)
				res.json({
					status: 403,
					message: 'forbidden'
				})

				return
			}

			const { exp } = jwt.decode(refreshToken)
			const newRefreshToken = jwt.sign({id: user.id, role: user.role, exp}, process.env.SECRET_KEY_RT)
			const newAccessToken = jwt.sign({id: user.id, role: user.role}, process.env.SECRET_KEY_AT, { expiresIn: '15m' })
			const persistedToken = await refreshTokenModel.update({ token: newRefreshToken }, {  
				where: {userId: user.id}
			})

			res.status(200)
			res.json({
				status: 200,
				message: 'success revoke new token',
				data: {
					accessToken: newAccessToken,
					refreshToken: newRefreshToken
				}
			})
		} catch(error) {
			console.log(error)
			res.status(500)
			res.json({
				status: 500,
				message: 'hollyshit'
			})
		}
	})
}