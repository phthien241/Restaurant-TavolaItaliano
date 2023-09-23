const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const food = require("./models/food")
const foodRoutes = require("./routes/food")
const reservation = require("./models/reservation")
const reservationRoutes = require("./routes/reservation")
const user = require("./models/user")
const userRoutes = require("./routes/user")
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
app.use("/api/user",userRoutes);
app.use("/api/reservation", reservationRoutes);
module.exports = app;