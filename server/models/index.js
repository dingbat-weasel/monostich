const { Schema, model } = require("mongoose");

const poemSchema = new Schema({
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
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // getter that formats date/time with util function
    // get: (timestamp) => dateFormat(timestamp),
  },
  // LIKES: Array of Likes, '[likedBy: user_id, ...]'
  // COMMENTS: text, author, createdAt
});

const Poem = model("Poem", poemSchema);

module.exports = Poem;
