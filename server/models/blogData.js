module.exports = (sequelize, DataTypes) => {
	return sequelize.define('blogDataAdmin', {
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
	}, {
		freezeTableName: true,
		timestamps: true,
		tableName:'blogDataAdmin'
	  });
	};