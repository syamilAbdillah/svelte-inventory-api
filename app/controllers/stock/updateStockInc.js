module.exports = stockModel => async (req, res) => {
	const stockIncDTO = {
		desc: req.body.desc,
		date: new Date(req.body.date),
		qty: req.body.qty,
		userId: req.user.id,
		productId: req.body.productId
	}

	try {
		const [updatedStockInc] = await stockModel.update(stockIncDTO, {
			where: { id: req.params.id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: `affected record ${updatedStockInc}`
		})
	} catch(error) {
		console.log(error)

		res.status(500)
		res.json({
			status: 500,
			message: 'failed to update stock increase'
		})
	}
}