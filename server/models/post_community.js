module.exports = (sequelize, DataTypes) => {
	const post_community = sequelize.define('post_community', {
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
		tableName: 'post_community',
		charset: 'utf8mb4 ',
		collate: 'utf8mb4_general_ci'
	});



	return post_community;
};