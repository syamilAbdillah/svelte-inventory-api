module.exports = ({sequelize, DataTypes, product, user}) => {
	return sequelize.define('stock', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		qty: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		desc: {
			type: DataTypes.STRING,
		},
		productId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: product,
				key: 'id'
			}
		},
		createdBy: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: user,
				key: 'id'
			}
		}
	})
}