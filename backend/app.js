const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const food = require("./models/food")
const foodRoutes = require("./routes/food")
const sequelize = require("./database");

const app = express();
sequelize.sync({force: false}).then(result=>{
    console.log("Database connected");
}).catch((err)=>{
    console.error("Unable to connect to the database", err)
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/menu",foodRoutes);

module.exports = app;