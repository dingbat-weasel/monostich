const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Mongoose automatically generates an _id property to the schema with type ObjectId
// TO DO: Error handling and conversion to render on client side for user on validation error
// https://levelup.gitconnected.com/handling-errors-in-mongoose-express-for-display-in-react-d966287f573b

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter a username."],
    unique: [true, "That username is taken."],
    minlength: [3, "Usernames must be more than 3 characters."],
    maxlength: [36, "Usernames must be less than 36 characters."],
    trim: true,
    match: [
      /^[a-zA-Z0-9_]*/,
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
  about: {
    type: String,
    required: false,
    trim: true,
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
  following: [
    {
      type: [String],
      ref: "User"
    }
  ],
  followedBy: [
    {
      type: [String],
      ref: "User"
    }
  ]
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

userSchema.methods.isCorrectPassword = async function (password) {
    // if (error) {
    //   return callback(error);
    // } else {
    //   callback(null, isMatch);
    // }
    return bcrypt.compare(password,this.password)
};

const User = model("User", userSchema);

module.exports = User;
