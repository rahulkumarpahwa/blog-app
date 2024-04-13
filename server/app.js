const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const newUser = new User({
      email,
      username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT)),
    });
    await newUser.save();
    res.redirect("http://localhost:1234/login");
    console.log("new user added");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/login", (req, res) => {});

app.listen(4000, () => {
  console.log("server is listening to port 4000");
});
