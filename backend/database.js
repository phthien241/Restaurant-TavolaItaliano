const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "restaurant",
  "username",
  "password",
  {
    host: "host name",
    dialect: "mysql",
    ssl: "true",
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  }
);

module.exports = sequelize;
