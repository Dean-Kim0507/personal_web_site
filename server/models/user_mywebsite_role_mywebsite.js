module.exports = (sequelize, DataTypes) => {
	const user_mywebsite_role_mywebsite = sequelize.define('user_mywebsite_role_mywebsite', {
		userID: {
			field: 'userID',
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			foreignKey: true
		},
		roleID: {
			field: 'roleID',
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true
		},

	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'user_mywebsite_role_mywebsite',
		charset: 'utf8mb4 ',
		collate: 'utf8mb4_general_ci'
	});

	return user_mywebsite_role_mywebsite;
};