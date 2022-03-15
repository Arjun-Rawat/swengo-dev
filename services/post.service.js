const httpStatus = require("http-status");
const { postModel } = require("../models");
const ApiError = require("../utils/ApiError");

const createPost = async (post) => {
  return postModel.create(post);
};

const queryPosts = async (filter, options) => {
  const posts = await postModel.paginate(filter, options);
  return posts;
};

module.exports = {
  createPost,
  queryPosts,
};
