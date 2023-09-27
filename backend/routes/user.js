const express = require("express");
const router = express.Router();
const User = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const multer = require("multer");

const storage = new Storage({
  projectId: "elite-elevator-399002",
  keyFilename: path.join(
    __dirname,
    "../../elite-elevator-399002-1455674e2b8d.json"
  ),
});
const bucketName = "tavola-italiano";
const bucket = storage.bucket(bucketName);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post("/sign-up", (req, res) => {
  User.findOne({ where: { email: req.body.email.toLowerCase() } }).then(
    (exist) => {
      if (exist) {
        res.status(401).send({ message: "Email already in use" });
      } else {
        User.create({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          isAdmin: 0,
          imageUrl: "https://storage.googleapis.com/tavola-italiano/default.jpg",
        }).then(() =>
          res.status(201).send({ message: "Sign up successfully" })
        );
      }
    }
  );
});

router.post("/sign-in", (req, res) => {
  User.findOne({
    where: { email: req.body.email.toLowerCase(), password: req.body.password },
  }).then((exist) => {
    if (exist) {
      let secrectKey = crypto.randomBytes(32).toString("hex");
      const token = jwt.sign({}, secrectKey, { expiresIn: "60s" });
      res.status(200).send({
        message: "Login successfully",
        token: token,
        firstName: exist.firstName,
        imageUrl: exist.imageUrl,
      });
    } else {
      res.status(401).send({ message: "Incorrect email or password" });
    }
  });
});

router.post("/get-profile", (req, res) => {
  User.findOne({ where: { email: req.body.email.toLowerCase() } })
    .then((user) => {
      res.status(200).send({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/set-profile", (req, res) => {
  User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    {
      where: {
        email: req.body.email,
      },
    }
  ).then(res.status(200).send({}))
});
router.post("/update-avatar", upload.single("image"), (req, res) => {
  const blob = bucket.file(req.body.email);
  const blobStream = blob.createWriteStream();

  blobStream.on("finish", async () => {
    const imageUrl = `https://storage.googleapis.com/${bucketName}/${req.body.email}`;
    User.update({ imageUrl: imageUrl }, { where: { email: req.body.email } });
  });
  blobStream.end(req.file.buffer);
});
module.exports = router;
