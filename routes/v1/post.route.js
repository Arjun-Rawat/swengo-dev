const express = require("express");
const { postController } = require("../../controllers");
const validate = require('../../middlewares/validate')
const postValidation =  require('../../validations/post.validation')
const router = express.Router();

// post routes
router.route("/")
.post( validate(postValidation.createPost),postController.addPost)
.get( postController.getPosts);


module.exports = router;
