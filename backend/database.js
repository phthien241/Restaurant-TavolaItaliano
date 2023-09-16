const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tavolai_italiano', 'theo', 'Thapdienmaiphuc241!', {
    host: '34.172.65.146',
    dialect: 'mysql'
});

module.exports = sequelize;