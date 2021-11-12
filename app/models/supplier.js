module.exports = (sequelize, DataTypes) => {
	return sequelize.define('supplier', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
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
		phone: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.TEXT
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		}
	})
}