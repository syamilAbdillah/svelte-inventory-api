module.exports = (unitModel) => async (req, res) => {
	try {
		const deletedUnit = await unitModel.destroy({
			where: { id: req.params.id }
		})

		if(!deletedUnit) throw new Error('something wrong with db')

		res.status(200)
		res.json({
			status: 200,
			message: 'berhasil menghapus data satuan'
		}) 
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'gagal menghapus data satuan',
			error: { message: error.message }
		})
	}
}