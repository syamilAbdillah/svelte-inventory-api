module.exports = ({jwt, userModel, bcrypt}) => async (req, res) => {
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


		const accessToken = jwt.sign({ 
			id: user.id,
			role: user.role  
		}, 
		process.env.SECRET_KEY_AT)

		res.status(200)
		res.json({
			status: 200,
			message: 'success login',
			data: { accessToken }
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