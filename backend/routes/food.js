const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  projectId: "coherent-acre-321514",
  keyFilename: path.join(
    __dirname,
    "../../coherent-acre-321514-f7413b1461ce.json"
  ),
});
const bucketName = "tavola-italiano-res";
const bucket = storage.bucket(bucketName);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.get("", (req, res) => {
  Food.findAll()
    .then((data) => {
      res.status(200).json({
        message: "Get food successfully",
        food: data,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/food", (req, res) => {
  Food.findOne({ where: { title: req.body.food } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
});

router.post("/add-menu", upload.single("image"), async (req, res) => {
  try {
    const existingFood = await Food.findOne({
      where: { title: req.body.title },
    });
    let imageUrl = "";
    if (req.file && req.file.originalname) {
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();
      await new Promise((resolve, reject) => {
        blobStream.on("finish", resolve);
        blobStream.on("error", reject);
        blobStream.end(req.file.buffer);
      });
      imageUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
    }
    if (existingFood) {
      let updatedFood = {
        description: req.body.description,
        price: +req.body.price,
        course: req.body.course,
        isValid: req.body.isValid,
      };
      if (!imageUrl == "") updatedFood.imageUrl = imageUrl;
      existingFood.update(updatedFood);
    } else {
      let createdFood = {
        title: req.body.title,
        description: req.body.description,
        price: +req.body.price,
        course: req.body.course,
        isValid: req.body.isValid,
      };
      createdFood.imageUrl =
        !imageUrl == ""
          ? imageUrl
          : "https://storage.googleapis.com/tavola-italiano-res/defaultFoodImage.png";
      Food.create(createdFood);
    }

    res.status(200).send({ message: "Food menu has been updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  //   if (req.file && req.file.originalname) {
  //     console.log("he");
  //     const blob = bucket.file(req.file.originalname);
  //     const blobStream = blob.createWriteStream();
  //     blobStream.on("finish", async () => {
  //       const imageUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
  //       Food.findOrCreate({
  //         where: { title: req.body.title },
  //         defaults: {
  //           title: req.body.title,
  //           description: req.body.description,
  //           price: +req.body.price,
  //           course: req.body.course,
  //           isValid: req.body.isValid,
  //           imageUrl: imageUrl,
  //         },
  //       });
  //     });
  //     blobStream.end(req.file.buffer);
  //   } else {
  //     Food.findOrCreate({
  //       where: { title: req.body.title },
  //       defaults: {
  //         title: req.body.title,
  //         description: req.body.description,
  //         price: +req.body.price,
  //         course: req.body.course,
  //         isValid: req.body.isValid,
  //         imageUrl:
  //           "https://storage.googleapis.com/tavola-italiano/defaultFoodImage.png",
  //       },
  //     });
  //   }
});

router.post("/delete", (req, res) => {
  Food.destroy({
    where: { title: req.body.name },
  })
    .then(() => {
      res.status(200).send({ message: "Delete successfully" });
    })
    .catch((err) => {
      res.status(400).send({ message: "Error in deleting food" });
    });
});

module.exports = router;
