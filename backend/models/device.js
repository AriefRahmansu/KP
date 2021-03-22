'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  device.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    asset: DataTypes.INTEGER,
    connected: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'device',
  });
  return device;
};