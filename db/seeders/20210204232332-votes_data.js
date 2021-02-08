'use strict'
const { Que } = require('../models')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const questIds = await Que.findAll({
			attributes: {
				include: ['id'],
			},
		})

		function getQueId(id = null) {
			let i = Math.floor(Math.random() * questIds.length)
			return questIds[i].id
		}
		let votes = []
		for (let i = 1; i < 25; i++) {
			let votesPerUser = []
			const max = 21
			const min = 3
			const numVotes = Math.floor(Math.random() * (max - min) + min)
			for (let j = 0; j < numVotes; j++) {
				let queId = getQueId()
				while (votesPerUser.includes(queId)) {
					queId = getQueId()
				}
				votesPerUser.push(queId)
				votes.push({
					isUpVote: Math.random() > 0.3 ? true : false,
					questionId: queId,
					userId: i,
					createdAt: new Date(),
					updatedAt: new Date(),
				})
			}
		}
		await queryInterface.bulkInsert('Votes', votes)
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Votes', null, {})
	},
}
