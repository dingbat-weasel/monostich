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
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // same getter to format date obj
      },
    },
  ],
});

const Poem = model("Poem", poemSchema);

module.exports = Poem;
