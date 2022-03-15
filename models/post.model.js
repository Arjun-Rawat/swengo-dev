const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const { toJSON, paginate } = require(".././models/plugin/index");

// post Model Definition
const postSchema = new Schema(
  {
    postid: { type: Schema.Types.ObjectId, require: true },
    tags: { type: Array },
    postContext: { type: String, required: true },
    images: { type: Array },
    videos: { type: Array },
    status: { type: Number, default: 1 },
  },

  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

// Export Module/Schema
module.exports = mongoose.model("posts", postSchema);
