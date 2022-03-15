const httpStatus = require("http-status");
const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const { postService } = require("../services");
// const { authService, userService, tokenService, emailService } = require('../services');

const addPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  // console.log(options);
  // const options = { limit: 100, page: 1, sortBy: "asc" };
  const result = await postService.queryPosts(filter, options);
  res.send(result);
});

module.exports = {
  addPost,
  getPosts,
};
