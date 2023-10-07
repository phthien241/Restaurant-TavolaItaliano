const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "restaurant",
  "huuthien241",
  "Thapdienmaiphuc241!",
  {
    host: "huuthien241.mysql.database.azure.com",
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
