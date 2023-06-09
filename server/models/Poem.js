const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const poemSchema = new Schema(
  {
    poemTitle: {
      type: String,
      default: "untitled",
      maxlength: 30,
      trim: true,
    },
    poemText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    poemAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter that formats date/time with util function
      get: (timestamp) => dateFormat(timestamp),
    },
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // LIKES: Array of Likes, '[likedBy: user_id, ...]'
    // COMMENTS: text, author, createdAt
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

const Poem = model("Poem", poemSchema);

module.exports = Poem;
