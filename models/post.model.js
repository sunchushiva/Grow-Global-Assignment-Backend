const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: String,
    title: String,
    isCompleted: Boolean,
  },
  { versionKey: false }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
