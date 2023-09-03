const express = require("express");
const posts = require("../usecases/posts.usecase");
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const newPost = await posts.create(req.body);
    res.status(201).json({ message: "Post created", data: { post: newPost } });
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ message: "Something went wrong", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { titleFilter, user } = req.query;
    const allPosts = await posts.getAll(titleFilter, user);
    res.json({ message: "Posts list", data: { posts: allPosts } });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


router.get("/search/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const post = await posts.getByTitle(title);
    res.json({ message: `Post ${post.title}`, data: { post } });
  } catch (error) {
    res.status(error.status || 500).json({ message: "Something went wrong", error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postDelete = await posts.deleteById(id);
    res.json({ message: "Post deleted", data: { post: postDelete } });
  } catch (error) {
    res.status(error.status || 500).json({ message: "Something went wrong", error: error.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postUpdateData = await posts.updateById(id, req.body);
    res.json({ message: "Post updated", data: { post: postUpdateData } });
  } catch (error) {
    res.status(error.status || 500).json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = router;
