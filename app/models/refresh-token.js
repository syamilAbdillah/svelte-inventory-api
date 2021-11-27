module.exports = (sequelize, DataTypes) => {
	return sequelize.define('refreshToken', {
		userId: {
			type: DataTypes.UUID,
			allowNull: false
		},

		token: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	})
}