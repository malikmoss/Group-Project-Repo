'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			answerId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Answers' },
				onDelete: 'CASCADE',
			},
			authorId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Users' },
				onDelete: 'CASCADE',
			},
			body: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Comments')
	},
}
