module.exports = stockModel => async (req, res) => {
	try {
		const deletedStockInc = await stockModel.destroy({where: {id: req.params.id}})

		res.status(200)
		res.json({
			status: 200,
			message: 'success delete stock increase'
		})
	} catch(error) {
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to delete a stock increase'
		})		
	}
}