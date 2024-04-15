const mongoose = require("mongoose");
const User = require("./user.js");
const Schema = mongoose.Schema; 

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: true,
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
