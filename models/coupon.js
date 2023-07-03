const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const Coupons = sequelize.define("coupons", {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount: {
    type: DataTypes.STRING,
    allowNull: null,
  },
});

module.exports = Coupons;
