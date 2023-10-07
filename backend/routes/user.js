const express = require("express");
const router = express.Router();
const User = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");

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

router.post("/sign-up", async (req, res) => {
  try {
    User.findOne({ where: { email: req.body.email.toLowerCase() } }).then(
      (exist) => {
        if (exist) {
          return res.status(401).send({ message: "Email already in use" });
        } else {
          User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAdmin: 0,
            imageUrl:
              "https://storage.googleapis.com/tavola-italiano-res/default.jpg",
          });
        }
      }
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kurrwin2@gmail.com",
        pass: "rrambytqiuwacsmp",
      },
    });
    const mailOptions = {
      from: "kurrwin2@gmail.com",
      to: req.body.email,
      subject: "Welcome to Our App",
      text: `Thank you for signing up, ${req.body.firstName}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Sign up successfully" });
  } catch (error) {
    res.status(500).send("Error during sign-up and email sending");
  }
});

router.post("/sign-in", (req, res) => {
  User.findOne({
    where: { email: req.body.email.toLowerCase(), password: req.body.password },
  }).then((exist) => {
    if (exist) {
      let secrectKey = crypto.randomBytes(32).toString("hex");
      const token = jwt.sign({}, secrectKey, { expiresIn: "180s" });
      res.status(200).send({
        message: "Login successfully",
        token: token,
        firstName: exist.firstName,
        imageUrl: exist.imageUrl,
        isAdmin: exist.isAdmin,
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
  ).then(res.status(200).send({}));
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
