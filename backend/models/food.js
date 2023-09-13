const Sequelize = require('sequelize');

const sequelize = require('../database');

const Food = sequelize.define('food',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    isValid: Sequelize.BOOLEAN,
    imageUrl:{
        type:Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Food;