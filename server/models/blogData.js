module.exports = (sequelize, DataTypes) => {
	const blogDataAdmin = sequelize.define('blogDataAdmin', {
		blog_id: {
			field: 'blog_id',
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			foreignKey: true
		},
		writer: {
			field: 'writer',
			type: DataTypes.STRING,
			allowNull: true
		},
		title: {
			field: 'title',
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			field: 'description',
			type: DataTypes.TEXT,
			allowNull: true
		},
		imagespath: {
			field: 'imagespath',
			type: DataTypes.TEXT,
			allowNull: true,
		},
		userID: {
			field: 'userID',
			type: DataTypes.STRING,
			allowNull: true,
		},
		isLogedIn: {
			field: 'isLogedIn',
			type: DataTypes.BOOLEAN,
			allowNull: false,
		}
	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'blogDataAdmin'
	});

	// blogDataAdmin.associate = function (models) {
	// 	blogDataAdmin.hasMany(models.blogComments, {
	// 		foreignKey: "blog_id"
	// 	})
	// }

	return blogDataAdmin;
};