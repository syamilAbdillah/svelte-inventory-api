const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = ({userModel, refreshTokenModel}) => async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await userModel.findOne({  
			where: { email }
		})

		if(!email) {
			res.status(404)
			res.json({
				status: 404,
				message: 'email not found'
			})

			return
		}

		const match = await bcrypt.compare(password, user.password)
		
		if(!match) {
			res.status(400)
			res.json({
				status: 400,
				message: 'invalid password'
			})
			
			return
		}


		const tokenPayload = { 
			id: user.id,
			role: user.role  
		}

		const accessToken = jwt.sign(tokenPayload, process.env.SECRET_KEY_AT, {expiresIn: '30m'})
		const refresToken = jwt.sign(tokenPayload, process.env.SECRET_KEY_RT, {expiresIn: '1d'})

		const isUserTokenExist = await refreshTokenModel.findOne({ where: { userId: user.id } })
		const persistedToken = isUserTokenExist ? 
			await refreshTokenModel.update({ token: refresToken }, { where: { userId: user.id } }):
			await refreshTokenModel.create({ token: refresToken, userId: user.id })

		res.status(200)
		res.json({
			status: 200,
			message: 'success login',
			data: { accessToken, refresToken }
		})

	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'something wrong with the server',
			error: { message: error.message || 'kiw' }
		})
	}
}