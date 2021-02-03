'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Ques',
      [
        {
          authorId: 8,
          body: 'What kind of music do you listen to?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 17,
          body: 'Which are your top ten favourite kpop songs?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 12,
          body: 'What is your favourite song lyrics?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 21,
          body: 'Who is the best visual in Kpop 2020?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 14,
          body: 'Have you listened to any new indie music podcasts?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 11,
          body: 'Who is more professional, BTS or Blackpink?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 17,
          body: 'Which K-pop song has the worst set?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 20,
          body: "What is the meaning of BLACKPINK's Pretty Savage lyrics?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 18,
          body: 'Why is JoJo Siwa famous?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 15,
          body:
            'You get to pick a theme song for a fellow Quoran. Which song will you choose and for whom?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 17,
          body:
            'Which K-pop songs hit differently when you understand the lyrics?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 10,
          body: 'Which AC/DC song has the best intro?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 12,
          body: 'What are some of the best girl groups and their songs?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 19,
          body:
            "Most great classic bands have one song that's definitive of the group. The Beatles do not. Why?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 23,
          body:
            'How did the old Technics rear speakers "Surround sound" work? ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 19,
          body:
            'What song must be played when you walk down the aisle on your holy matrimony?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 15,
          body: 'How do you download music from computer to iPhone?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 30,
          body:
            'I want to do the school talent show and sing an Ariana Grande song. I can sing highs and lows, except whistle notes and powerful high voice. Any suggestions?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 32,
          body: 'Was ‘Susie Q’ the first big hit for CCR?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 31,
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
