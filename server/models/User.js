const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Mongoose automatically generates an _id property to the schema with type ObjectId
// TO DO: Error handling and conversion to render on client side for user on validation error

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter a username."],
    unique: [true, "That username is taken."],
    minlength: [3, "Usernames must be more than 3 characters."],
    maxlength: [36, "Usernames must be less than 36 characters."],
    trim: true,
    match: [
      /^[a-zA-Z0-9_]*$"/,
      "Usernames may only include letters, numbers, and underscore.",
    ],
  },
  email: {
    type: String,
    required: [true, "Enter an email address."],
    unique: [true, "That email address is taken."],
    match: [/.+@.+\..+/, "Enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Enter a password."],
    minlength: [8, "Password should be at least eight characters."],
    maxlength: 256,
  },
  poems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
  likedPoems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
  commentedPoems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
  savedPoems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
});

userSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

const User = model("User", userSchema);

module.exports = User;
