const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:1234",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const upload = multer({ dest: "uploads/" });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog-app");
}

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });

app.get("/", (req, res) => {
  res.send("blog backend working");
});

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const newUser = new User({
      email,
      username,
      password: bcrypt.hashSync(password, Number(process.env.SALT)),
    });
    await newUser.save();
    // res.redirect("http://localhost:1234/login");
    res.status(200).json(newUser);
    console.log("new user added");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });
  const valid = bcrypt.compareSync(password, findUser.password);
  if (valid) {
    jwt.sign(
      { username: findUser.username, id: findUser._id },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }
        res
          .cookie("token", token)
          .json({ id: findUser._id, username: findUser.username });
        console.log("new user loggined");
      }
    );
    // res.status(200).json({ success: true });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, (err, info) => {
    if (err) {
      throw err;
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), (req, res) => {
  const { title, summary, content } = req.body;
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  fs.renameSync(path, path + "." + ext);
  console.log(req.file);
  console.log(title, summary, content);
});

app.listen(4000, () => {
  console.log("server is listening to port 4000");
});
