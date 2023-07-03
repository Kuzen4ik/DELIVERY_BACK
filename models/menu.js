const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const Menu = sequelize.define("menu", {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  shopId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Menu.belongsTo(Shop, { foreignKey: "shopId" });

module.exports = Menu;
