module.exports = (sequelize, DataTypes) => {
	const post_feedback = sequelize.define('post_feedback', {
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		writer: {
			field: 'writer',
			type: DataTypes.STRING,
			allowNull: true,
		},
		title: {
			field: 'title',
			type: DataTypes.STRING,
			allowNull: true,
		},
		desc: {
			field: 'desc',
			type: DataTypes.STRING,
			allowNull: true,
		},

	}, {
		freezeTableName: true,
		timestamps: true,
		tableName: 'post_feedback'
	});



	return post_feedback;
};