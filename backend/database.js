const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tavolaitaliano', 'root', 'Thapdienmaiphuc241!', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;