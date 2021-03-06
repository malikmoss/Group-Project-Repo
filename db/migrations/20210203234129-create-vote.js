'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			'Votes',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				isUpVote: {
					type: Sequelize.BOOLEAN,
				},
				questionId: {
					type: Sequelize.INTEGER,
					unique: 'votes_unique',
					references: { model: 'Ques' },
				},
				userId: {
					allowNull: false,
					unique: 'votes_unique',
					type: Sequelize.INTEGER,
					references: { model: 'Users' },
				},

				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			{
				uniqueKeys: {
					votes_unique: { fields: ['questionId', 'userId'] },
				},
			}
		)
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Votes')
	},
}
