'use strict';
const { Answer } = require('../models')
const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
*/
      const answerIds = await Answer.findAll({
        attributes: {
          include: ['id'],
        },
      });

      function getAnswerId() {
        let i = Math.floor(Math.random() * answerIds.length);
        return answerIds[i].id
      };

      const authorIds = await User.findAll({
        attributes: {
          include: ['id'],
        },
      });

      function getAuthId() {
        let i = Math.floor(Math.random() * authorIds.length);
        return authorIds[i].id;
      }

      await queryInterface.bulkInsert('Comments', [

        { answerId: getAnswerId() , authorId: getAuthId() , body: 'If I roll once and you roll twice. What does that mean?' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'I never meant to cause you any sorrow. I never meant to cause you any pain. I only wanted to one time see you laughing. I only wanted to see you laughing in the purple rain.' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Don't want to close my eyes I don't want to fall asleep Cause I'd miss you babe And I don't want to miss a thing Cause even when I dream of you The sweetest dream will never do I'd still miss you babe And I dont want to miss a thing." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Please allow me to introduce myself I'm a man of wealth and taste I've been around for a long, long year Stole many a mans soul and faith And I was round when jesus christ Had his moment of doubt and pain." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'And everything is going to the beat And everything is going to the beat And everything is going...' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Buddy you're a young man hard man Shoutin' in the street gonna take on the world some day You got blood on yo' face You big disgrace Wavin' your banner all over the place." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Now this is the story all about how My life got flipped, turned upside down And I'd like to take a minute just sit right there I'll tell you how I became the prince of a town called Bel-air." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Loving you Isn't the right thing to do How can I Ever change things that I feel? If I could Maybe I'd give you my world How can I When you won't take it from me?" , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "People always told me be careful of what you do And dont go around breaking young girls' hearts And mother always told me be careful of who you love And be careful of what you do cause the lie becomes the truth." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'And everything is going to the beat And everything is going to the beat And everything is going...' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'I never meant to cause you any sorrow. I never meant to cause you any pain. I only wanted to one time see you laughing. I only wanted to see you laughing in the purple rain.' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'Microsoft bought Skype for 8,5 billion!.. what a bunch of idiots! I downloaded it for free!' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Sorry, I can't hangout. My uncle's cousin's sister in law's best friend's insurance agent's roommate's pet goldfish died. Maybe next time." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Why go to college? There's Google." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Don't steal, don't lie, don't cheat, don't sell drugs. The government hates competition!" , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "After one look at this planet any visitor from outer space would say “I WANT TO SEE THE MANAGER." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'If I roll once and you roll twice. What does that mean?' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'I never meant to cause you any sorrow. I never meant to cause you any pain. I only wanted to one time see you laughing. I only wanted to see you laughing in the purple rain.' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Don't want to close my eyes I don't want to fall asleep Cause I'd miss you babe And I don't want to miss a thing Cause even when I dream of you The sweetest dream will never do I'd still miss you babe And I dont want to miss a thing." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Please allow me to introduce myself I'm a man of wealth and taste I've been around for a long, long year Stole many a mans soul and faith And I was round when jesus christ Had his moment of doubt and pain." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'And everything is going to the beat And everything is going to the beat And everything is going...' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Buddy you're a young man hard man Shoutin' in the street gonna take on the world some day You got blood on yo' face You big disgrace Wavin' your banner all over the place." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Now this is the story all about how My life got flipped, turned upside down And I'd like to take a minute just sit right there I'll tell you how I became the prince of a town called Bel-air." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Loving you Isn't the right thing to do How can I Ever change things that I feel? If I could Maybe I'd give you my world How can I When you won't take it from me?" , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "People always told me be careful of what you do And dont go around breaking young girls' hearts And mother always told me be careful of who you love And be careful of what you do cause the lie becomes the truth." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'And everything is going to the beat And everything is going to the beat And everything is going...' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'I never meant to cause you any sorrow. I never meant to cause you any pain. I only wanted to one time see you laughing. I only wanted to see you laughing in the purple rain.' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: 'Microsoft bought Skype for 8,5 billion!.. what a bunch of idiots! I downloaded it for free!' , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Sorry, I can't hangout. My uncle's cousin's sister in law's best friend's insurance agent's roommate's pet goldfish died. Maybe next time." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Why go to college? There's Google." , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "Don't steal, don't lie, don't cheat, don't sell drugs. The government hates competition!" , createdAt: new Date(), updatedAt: new Date() },
        { answerId: getAnswerId() , authorId: getAuthId() , body: "After one look at this planet any visitor from outer space would say “I WANT TO SEE THE MANAGER." , createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkDelete('Comments', null, {});

  }
};
