const Sequelize = require('sequelize');

const sequelize = require('../database');

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;