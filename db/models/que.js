'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Que extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Que.belongsTo(models.User, { foreignKey: 'authorId' } );
    }
  };
  Que.init({
    body: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Que',
  });
  return Que;
};
