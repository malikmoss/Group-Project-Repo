'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    questionId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
  }, {indexes: [{unique: true, fields: ['questionId', 'authorId']}]});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User, { foreignKey: 'authorId' });
    Answer.belongsTo(models.Que, { foreignKey: 'questionId' });
    Answer.hasMany(models.Vote, { foreignKey: 'answerId' });

  };
  return Answer;
};
