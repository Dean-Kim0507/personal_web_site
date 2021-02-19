module.exports = (sequelize, DataTypes) => {
	const user_mywebsite = sequelize.define('user_mywebsite', {
		userID: {
			field: 'userID',
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		password: {
			field: 'password',
			type: DataTypes.STRING,
			allowNull: false
		},
		firstName: {
			field: 'firstName',
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			field: 'lastName',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false,
		},
		profile_img_path: {
			field: 'profile_img_path',
			type: DataTypes.TEXT,
			allowNull: true,
		},
	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'user_mywebsite',
		charset: 'utf8mb4 ',
		collate: 'utf8mb4_general_ci'
	});

	// blogDataAdmin.associate = function (models) {
	// 	blogDataAdmin.hasMany(models.blogComments, {
	// 		foreignKey: "blog_id"
	// 	})
	// }

	return user_mywebsite;
};