const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const Shop = sequelize.define("shops", {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Shop.hasMany(Menu, { foreignKey: "shopId" });

module.exports = Shop;
