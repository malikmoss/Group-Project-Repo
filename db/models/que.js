'use strict'
module.exports = (sequelize, DataTypes) => {
	const Que = sequelize.define(
		'Que',
		{
			body: DataTypes.STRING,
			authorId: DataTypes.INTEGER,
		},
		{}
	)
	Que.associate = function (models) {
		// associations can be defined here
		Que.belongsTo(models.User, { foreignKey: 'authorId' })
		Que.hasMany(models.Vote, { foreignKey: 'questionId' })
		Que.hasMany(models.Answer, { foreignKey: 'questionId' })
	}
	return Que
}
