'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isUpVote: {
        type: Sequelize.BOOLEAN
      },
      questionId: {
        type: Sequelize.INTEGER,
        unique: 'votes_unique',
        references: { model: 'Ques' }
      },
      userId: {
        allowNull: false,
        unique: 'votes_unique',
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      answerId: {
        type: Sequelize.INTEGER,
        unique: 'votes_unique',
        references: { model: 'Answers' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        votes_unique: {fields: ['questionId', 'userId', 'answerId']}
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Votes');
  }
};