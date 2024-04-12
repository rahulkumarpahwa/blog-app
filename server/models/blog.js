const mongoose = require("mongoose");
const User = require("./user.js");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdOn: {
    type: date,
    default: Date.now(),
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
