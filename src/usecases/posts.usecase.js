const mongoose = require("mongoose");
const Post = require("../models/posts.model");
const User = require("../models/users.model");
const createError = require("http-errors");

async function create(postData) {
  // validar que el id del user tiene un formato de id
  if (!mongoose.isValidObjectId(postData.user)) {
    throw new createError(400, "Invalid user id");
  }

  // validar que el user exista
  const user = await User.findById(postData.user);

  if (!user) {
    throw new createError(404, "This asshole doesn't exist");
  }

  return Post.create(postData);
}


async function getAll(titleFilter, user) {
  const filters = {};

  if (titleFilter) {
    filters.title = new RegExp(titleFilter, "i");
  }

  if (user && mongoose.isValidObjectId(user)) {
    filters.user = user;
  }

  return Post.find(filters).populate("user");
}


async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  const post = await Post.findById(id).populate("user");

  if (!post) {
    throw new createError(404, "This fucking post doesn't exist");
  }

  return post;
}

async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }
  const postDelete = await Post.findByIdAndDelete(id);

  if (!postDelete) {
    throw new createError(404, "This fucking post doesn't exist");
  }

  return postDelete;
}

async function updateById(id, dataToUpdate) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  if (dataToUpdate.user) {
    if (!mongoose.isValidObjectId(dataToUpdate.user)) {
      throw new createError(400, "Invalid user id");
    }

    const user = await User.findById(dataToUpdate.user);
    if (!user) {
      throw new createError(404, "This asshole doesn't exist");
    }
  }

  dataToUpdate.updated = new Date();

  const postUpdated = await Post.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!postUpdated) {
    throw new createError(404, "This fucking post doesn't exist");
  }

  return postUpdated;
}

async function getByTitle(title) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  const post = await Post.find(title)//.populate("user");

  if (!post) {
    throw new createError(404, "This fucking post doesn't exist");
  }

  return post;
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
  getByTitle
};