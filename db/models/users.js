'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      Users.hasMany(models.Que, { foreignKey: 'authorId' });
=======
      // define association here
      Users.hasMany(models.Ques, {foreignKey: 'authorId'})
>>>>>>> main
    }
  };
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return Users;
};
