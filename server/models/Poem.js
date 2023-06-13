const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const poemSchema = new Schema(
  {
    poemText: {
      type: [String],
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    poemAuthor: {
      type: String,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter that formats date/time with util function
      get: (timestamp) => dateFormat(timestamp),
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        commentText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentAuthor: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
    saves: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

poemSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

poemSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

poemSchema.virtual("saveCount").get(function () {
  return this.saves.length;
});

const Poem = model("Poem", poemSchema);

module.exports = Poem;
