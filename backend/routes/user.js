const express = require("express");
const router = express.Router();
const User = require("../models/user")
const crypto = require('crypto')
const jwt = require("jsonwebtoken")

router.post("/sign-up", (req, res) => {
    User.findOne({ where: { email: req.body.email.toLowerCase() } }).then(exist => {
        if (exist) {
            res.status(401).send({ message: "Email already in use" })
        } else {
            User.create({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                isAdmin: 0,
                imageUrl: ""
            }).then(() => res.status(201).send({ message: "Sign up successfully" }))
        }
    }
    )
})

router.post("/sign-in",(req,res)=>{
    User.findOne({where: {email: req.body.email.toLowerCase(), password: req.body.password}}).then(exist=>{
        if(exist){
            let secrectKey = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign({},secrectKey, {expiresIn:"1000*60*60*24"})
            res.status(200).send({message:"Login successfully", token: token, firstName: exist.firstName});
        }else{
            res.status(401).send({message: "Incorrect email or password"})
        }
    })
})

module.exports = router;