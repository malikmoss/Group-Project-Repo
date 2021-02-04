'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    isUpVote: DataTypes.BOOLEAN,
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {indexes: [{unique: true, fields: ['questionId', 'userId', 'answerId']}]});
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.User, { foreignKey: 'userId'});
    Vote.belongsTo(models.Que, { foreignKey: 'questionId'});
    Vote.belongsTo(models.Answer, {foreignKey: 'answerId' })
  };
  return Vote;
};