const express = require("express");
const router = express.Router();
const Food = require("../models/food")
const multer = require("multer");
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    projectId: 'elite-elevator-399002',
    keyFilename: path.join(__dirname,'../../elite-elevator-399002-1455674e2b8d.json')
})
const bucketName = 'tavola-italiano';
const bucket = storage.bucket(bucketName);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.get("", (req,res)=>{
    Food.findAll().then(data=>{
        res.status(200).json({
            message: "Get food successfully",
            food: data
        })
    }).catch(err=>console.log(err));
})

router.post("/add-menu",upload.single("image"),(req,res)=>{
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('finish', async () => {
      const imageUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      let food = new Food({
        title: req.body.title,
        description: req.body.description,
        price: +req.body.price,
        course: req.body.course,
        isValid: req.body.isValid,
        imageUrl: imageUrl
    });
    food.save().then(()=>{
        res.status(200).json({message:"Add food successfully"});
    })
    });

    blobStream.end(req.file.buffer);

    
})

module.exports = router;