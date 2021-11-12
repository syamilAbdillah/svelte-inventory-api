module.exports = ({
	sequelize, 
	DataTypes, 
	unit, 
	supplier, 
	category
}) => {
	return sequelize.define('product', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false
		},

		code: {
			type: DataTypes.STRING,
			allowNull: false
		},

		unitId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: unit,
				key: 'id'
			}
		},

		supplierId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: supplier,
				key: 'id'
			}
		},

		categoryId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: category,
				key: 'id'
			}
		}
	})
}