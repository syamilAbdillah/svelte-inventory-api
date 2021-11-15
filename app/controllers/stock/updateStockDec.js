module.exports = stockModel => async (req, res) => {
	const stockDecDTO = {
		desc: req.body.desc,
		date: new Date(req.body.date),
		qty: (req.body.qty * -1),
		userId: req.user.id,
		productId: req.body.productId
	}

	try {
		const [updatedStockDec] = await stockModel.update(stockDecDTO, {
			where: { id: req.params.id }
		})

		res.status(200)
		res.json({
			status: 200,
			message: `affected record ${updatedStockDec}`
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