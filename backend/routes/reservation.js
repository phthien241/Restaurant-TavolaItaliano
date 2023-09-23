const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation")

router.get("/get-reservation",(req,res)=>{
    Reservation.findAll().then(data=>{
        res.status(200).send(data);
    }).catch(err=>console.log(err));
})

router.post("/make-reservation", (req, res) => {
    Reservation.create({
        email: "test@email.com",
        name: req.body.name,
        size: req.body.size,
        branch: req.body.branch,
        date: req.body.date,
        time: req.body.time
    })
    .then(() => res.status(200).send({ message: "Make reservation successfully" }))
    .catch(err => res.status(404).send({ message: "There is a error in reservation" }))
})
module.exports = router;