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
		},
	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'blogcomments'
	});
};