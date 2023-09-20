const Sequelize = require('sequelize');

const sequelize = require('../database');

const Reservation = sequelize.define('reservation',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    size:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    branch: {
        type:Sequelize.STRING,
        allowNull: false
    },
    date : {
        type: Sequelize.DATE,
        allowNull: false
    },
    time:{
        type: Sequelize.TIME,
        allowNull: false
    },
})

module.exports = Reservation;