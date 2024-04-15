const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Blog = require("./models/blog.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const { error } = require("console");
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
app.use("/uploads", express.static(__dirname + "/uploads"));

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
        // console.log("new user loggined");
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

app.post("/post", upload.single("file"), async (req, res) => {
  const { title, summary, content } = req.body;
  const { originalname, destination, filename, path } = req.file;
  const parts = originalname.split(".");
  // console.log(parts);
  const ext = parts[parts.length - 1];
  const newPath = filename + "." + ext;
  const image = destination + newPath;
  fs.renameSync(path, image);
  // console.log(req.file);
  // console.log(newPath);
  // console.log(path)
  // console.log(image);

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const newBlog = new Blog({
      title,
      summary,
      content,
      image,
      user: info.id,
    });
    await newBlog.save();
    console.log(newBlog);
    
  });
  res.status(200).json("ok");
});

app.get("/post", async (req, res) => {
  const blogs = await Blog.find()
    .populate("user", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.send(blogs);
});

app.put("/post", upload.single("file"), async (req, res) => {
  const { title, summary, content, id } = req.body;
  let image = "";
  if (req.file != undefined) {
    const { originalname, destination, filename, path } = req.file;
    const parts = originalname.split(".");
    // console.log(parts);
    const ext = parts[parts.length - 1];
    const newPath = filename + "." + ext;
    image = destination + newPath;
    fs.renameSync(path, image);
  }
  // console.log(id);
  // console.log(req.body);
  // console.log(image);

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const findPost = await Blog.findById(id);
    // console.log(findPost);
    const isUser = String(findPost.user[0]._id) === String(info.id);
    // console.log(isUser, findPost.user[0]._id, info.id);
    if (!isUser) {
      return res.status(400).json("You are not that Author");
    }
    const updatedPost = await Blog.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      image: image ? image : findPost.image,
    });
    console.log(updatedPost);
    
  });
  res.status(200).json("ok");
});



app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const findPost = await Blog.findOne({ _id: id }).populate("user", [
    "username",
  ]);
  // console.log(findPost);
  res.send(findPost);
  // res.status(200).json("ok");
});



app.listen(4000, () => {
  console.log("server is listening to port 4000");
});
