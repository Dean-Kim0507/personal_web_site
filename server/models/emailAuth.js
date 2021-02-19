module.exports = (sequelize, DataTypes) => {
	const emailAuth = sequelize.define('emailAuth', {
		token: {
			field: 'token',
			type: DataTypes.STRING,
			allowNull: false
		},
		userID: {
			field: 'userID',
			type: DataTypes.STRING,
			allowNull: false,
			foreignKey: true
		},
		ttl: {
			field: 'ttl',
			type: DataTypes.INTEGER,
			allowNull: false,
		},

	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'emailAuth',
		charset: 'utf8mb4 ',
		collate: 'utf8mb4_general_ci'
	});



	return emailAuth;
};