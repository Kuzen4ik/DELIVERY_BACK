const { Client } = require("pg");
const { Sequelize } = require("sequelize");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 8000,
  password: "123123123",
  database: "postgres",
});

const sequelize = new Sequelize({
  host: "localhost",
  port: 8000,
  username: "postgres",
  password: "123123123",
  database: "postgres",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

module.exports = { sequelize, client };
