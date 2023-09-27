const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");

router.get("/get-reservation", (req, res) => {
  Reservation.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
});

router.post("/get-reservation-filter", (req, res) => {
  if (req.body.date && req.body.branch) {
    Reservation.findAll({
      where: { date: req.body.date, branch: req.body.branch },
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => console.log(err));
  } else if (req.body.date) {
    Reservation.findAll({
      where: { date: req.body.date },
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => console.log(err));
  } else {
    Reservation.findAll({
      where: { branch: req.body.branch },
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => console.log(err));
  }
  Reservation.findAll({ where: { date: req.body.date } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
});

router.post("/get-reservation-user", (req, res) => {
  Reservation.findAll({ where: { email: req.body.email } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
});

router.post("/make-reservation", (req, res) => {
  Reservation.create({
    email: req.body.email,
    name: req.body.name,
    size: req.body.size,
    branch: req.body.branch,
    date: req.body.date,
    time: req.body.time,
  })
    .then(() =>
      res.status(200).send({ message: "Make reservation successfully" })
    )
    .catch((err) =>
      res.status(404).send({ message: "There is a error in reservation" })
    );
});
module.exports = router;
