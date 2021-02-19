module.exports = (sequelize, DataTypes) => {
	const role_mywebsite = sequelize.define('role_mywebsite', {
		roleID: {
			field: 'roleID',
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		role: {
			field: 'role',
			type: DataTypes.STRING,
			allowNull: false,
		},

	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'role_mywebsite',
		charset: 'utf8mb4 ',
		collate: 'utf8mb4_general_ci'
	});



	return role_mywebsite;
};