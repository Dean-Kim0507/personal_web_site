module.exports = (sequelize, DataTypes) => {
	return sequelize.define('blogcomments', {
		blog_comment: {
			field: 'blog_comment',
			type: DataTypes.TEXT,
			allowNull: true
		},
		blog_id: {
			field: 'blog_id',
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true
		},
	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'blogcomments',
		charset: 'utf8mb4 ',
		collate: 'utf8mb4_general_ci'
	});
};