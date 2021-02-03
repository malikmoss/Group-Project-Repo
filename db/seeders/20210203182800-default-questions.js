'use strict';
const { User } = require('../models');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const userIds = await User.findAll({
			attributes: {
				include: ['id'],
			},
		});

		function getUserId() {
			let i = Math.floor(Math.random() * userIds.length);
			return userIds[i];
		}

		await queryInterface.bulkInsert(
			'Ques',
			[
				{
					authorId: getUserId(),
					body: 'What kind of music do you listen to?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Which are your top ten favourite kpop songs?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'What is your favourite song lyrics?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Who is the best visual in Kpop 2020?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Have you listened to any new indie music podcasts?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Who is more professional, BTS or Blackpink?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Which K-pop song has the worst set?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: "What is the meaning of BLACKPINK's Pretty Savage lyrics?",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Why is JoJo Siwa famous?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body:
						'You get to pick a theme song for a fellow Quoran. Which song will you choose and for whom?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body:
						'Which K-pop songs hit differently when you understand the lyrics?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Which AC/DC song has the best intro?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'What are some of the best girl groups and their songs?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body:
						"Most great classic bands have one song that's definitive of the group. The Beatles do not. Why?",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body:
						'How did the old Technics rear speakers "Surround sound" work? ',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body:
						'What song must be played when you walk down the aisle on your holy matrimony?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'How do you download music from computer to iPhone?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body:
						'I want to do the school talent show and sing an Ariana Grande song. I can sing highs and lows, except whistle notes and powerful high voice. Any suggestions?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body: 'Was ‘Susie Q’ the first big hit for CCR?',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					authorId: getUserId(),
					body:
						"If you hear a new song and don't know anything about it, how would you be able to tell if it is rock, metal, or heavy metal? And what kind?",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Ques', null, {});
	},
};
