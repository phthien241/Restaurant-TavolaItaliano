const express = require("express");
const router = express.Router();
const Food = require("../models/food")
const multer = require("multer");

const storage = multer.memoryStorage({
    destination: function( req,file,cb){
        cb(null, "");
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + file.originalname);
    }
});
const upload = multer({storage: storage});

router.get("", (req,res)=>{
    Food.findAll().then(data=>{
        res.status(200).json({
            message: "Get food successfully",
            food: data
        })
    }).catch(err=>console.log(err));
})

router.post("/addFood",upload.single("imageUrl"),(req,res)=>{
    let food = new Food({
        title: req.body.title,
        description: req.body.description,
        isValid: req.body.isValid,
        image: {data: req.file.buffer, contentType: req.file.mimetype}
    });
    food.save().then(()=>{
        res.status(200).json({message:"Add food successfully"});
    })
})

module.exports = router;