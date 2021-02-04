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

      const authorIds = await User.findAll({
        attributes: {
          include: ['id'],
        },
      });
  
      function getAuthId() {
        let i = Math.floor(Math.random() * authorIds.length);
        return authorIds[i].id;
      }

      await queryInterface.bulkInsert('Answers', [


        {questionId: getQueId(), authorId: getAuthId(), body: "He is the most handsome organism on this planet. The other ones below are in no specific order." , createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "It is because on the recording Eric Clapton did not play the opening riff. Duane Allman came up with the famous guitar riff and played lead with Clapton", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "I’d have to go with Gentle Giant, the British prog-rock band from the 70s. ", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "They sound sloppy and loose on purpose.Thats their signature sound. They are instantly recognizable when a Stones track plays.", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "Strats are extremely versatile guitars and with the right effects they can sound pretty much any way you want. Even though Jimmy Page is associated with a Les Paul, he used a Fender Telecaster on lots of the early recordings and even famously used one for the solo on Stairway.", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "The most technically excellent guitarists I have met (Joe Satriani, Kiko Loureiro, Bumblefoot, Doug Doppler) play all the time. ", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "Elvis was the best-selling solo singer of all time. In 1954–57 he was a pioneer of rockabilly.", createdAt: new Date, updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "He isn’t always in the back. Sometimes the drummer is right upfront if he is the lead singer or if the band is drum intensive.", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "Motorhead felt they were more in line with bands like the Ramones.", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "Man, 1994 was a great year for rap music. This is hip hop's variety show, made by one of the greatest. So many classics. It's the holy trinity of the east coast along with the previous 2.", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "Runner-ups include Only Built 4 Cuban Linx, Ironman, Supreme Clientele, Life After Death, I Am..., The Eminem Show, The Low End Theory, and The Infamous", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "The entertainment industry is not about producing art, but making money off of entertaining people and things. Gangam Style got a lot of views because it was entertaining...", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "Someone posted THE ROLLING STONES as the most concert ticket unit sales but that’s INCORRECT", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "There have been attempts at individual artists (Garth Brooks) or small groups of Artists (Tidal) to create their own services", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "I will go with “Shake the disease” from 1985. The lyrics of the songs are suitably ambiguous that they can fit a range of relationship situations.", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "The original music which which was written for the Harry Potter films (by John Williams, Nicholas Hooper and others)", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "On rare occasions, popular songs can be used effectively — often in movies that take place in a past era,", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "I have never been a fan of boy bands. Not now, not ever. I remember when I was young and the girls my age LOVED New Kids on the Block. GAG!", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "Just some songs that I like that kinda sound like that type? Not sure if you'll like em but I really do!", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "There is very little room at the top, and there is a huge number of talented musicians.", createdAt: new Date(), updatedAt: new Date()},
        {questionId: getQueId(), authorId: getAuthId(), body: "It’s just another Gangnam style that will disappear like freeze challenge, ice bucket challenge, watch me whip, planking, etc", createdAt: new Date(), updatedAt: new Date()},

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Answers', null, {});
  }
};
