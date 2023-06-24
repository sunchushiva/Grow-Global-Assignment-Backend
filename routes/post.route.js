const express = require("express");
const authorizeMiddleware = require("../middlewares/authorize.middleware");
const PostModel = require("../models/post.model");

const postRoute = express.Router();

postRoute.get("/", authorizeMiddleware, async (req, res) => {
  const { user } = req.body;
  try {
    const DATA = await PostModel.find({ user });
    res.status(200).send(DATA);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

postRoute.post("/add", authorizeMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new PostModel(payload);
    await newPost.save();
    res.status(200).send({ message: "Post added successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

postRoute.patch("/update/:_id", authorizeMiddleware, async (req, res) => {
  const payload = req.body;
  const { _id } = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id }, payload);
    res.status(200).send({ message: "Post updated successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

postRoute.delete("/delete/:_id", authorizeMiddleware, async (req, res) => {
  const { _id } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id });
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = postRoute;
