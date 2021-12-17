module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profile: {
			type: DataTypes.STRING,
			defaultValue: 'static/placeholder.png'
		},
		role: {
			type: DataTypes.ENUM('gudang', 'admin', 'super admin'),
			allowNull: false
		}
	})
}