'use strict';
const { Que } = require('../models')
const { User } = require('../models')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const questIds = await Que.findAll({
      attributes: {
        include: ['id'],
      },
    });

    function getQueId() {
      let i = Math.floor(Math.random() * questIds.length);
      return questIds[i].id
    };

    const userIds = await User.findAll({
      attributes: {
        include: ['id']
      }
    })

    function getUserId() {
      let i = Math.floor(Math.random() * userIds.length);
      return userIds[i].id;
    }

    let array = []
    for (let i = 0; i < 300; i++) {
      array.push(
        { userId: getUserId(),
          isUpVote: Math.random() > 0.3 ? true: false,
          questionId: getQueId(),
          createdAt: new Date (),
          updatedAt: new Date ()
      })
    }
    await queryInterface.bulkInsert('Votes', array)


    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
