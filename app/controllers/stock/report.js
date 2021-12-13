module.exports = (productModel, sequelize) => async (req, res) => {
	try {
		// const reports = await stockModel.findAll({
		// 	attributes: [
		// 		[sequelize.col('product.name'), 'product-name'],
		// 		[sequelize.col('product.code'), 'product-code'],
		// 		[sequelize.col('product.unit.name'), 'unit-name'], 
		// 		[sequelize.col('product.supplier.name'), 'supplier-name'],
		// 		[sequelize.col('product.supplier.code'), 'supplier-code'], 
		// 		[sequelize.col('product.category.name'), 'category-name'],  
		// 		[sequelize.fn('sum', sequelize.col('qty')), 'currentStock']
		// 	],
		// 	group: ['product.id', 'product.unit.id', 'product.supplier.id', 'product.category.id'],
		// 	include: [{
		// 		association: 'product',
		// 		attributes: [],
		// 		include: [
		// 			{association: 'unit', attributes: []},
		// 			{association: 'supplier', attributes: []},
		// 			{association: 'category', attributes: []}
		// 		]
		// 	}]
		// })

		const products = await productModel.findAll({
			attributes: ['name', 'code'],
			include: [
				{association: 'unit', attributes: ['name']},
				{association: 'supplier', attributes: ['name', 'code']},
				{association: 'category', attributes: ['name']},
				{
					association: 'stocks', 
					attributes: ['qty']
				}
			]
		})

		const reports = JSON.parse(JSON.stringify(products)).map(product => ({
			...product, 
			stocks: {
				total: product.stocks.reduce((curr, acc) => curr + acc.qty, 0)
			}
		}))

		res.status(200)
		res.json({
			status: 200,
			message: 'success get stock report',
			data: reports
		})
	} catch(error) {
		console.log(error)
		res.status(500)
		res.json({
			status: 500,
			message: 'failed to get stock report'
		})
	}
}