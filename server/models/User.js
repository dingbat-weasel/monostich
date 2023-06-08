const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // To Do: Decide on standard max/min lengths for user inputs
    // Declare these requirements to user on client side
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // To Do: Improve this match? User email authentication/verification as a sprinkle?
    match: [/.+@.+\..+/, "Must be a valid email."],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  // TO DO?:  mongoose supports storing arrays and arrays of strings, arrays of other schemas. What is the optimal way to store our poems in the db? https://mongoosejs.com/docs/schematypes.html#arrays
  // Poems will be saved as an array of strings ["", "", ...], before we were stringify that array to save it as one string then parsing later to use. This maintains the distinct tiles which is needed for styling during client side rendering. Do we still need to stringify and parse? Just some thoughts -isaac
  poems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
  // To Do: Saved Poems functionality, Here is something to start:
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

// To Do: BCRYPT PASSWORD
// pre-save on schema that hashes function
// This is from activity, needs look-over to make sure its good
// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//       const saltRounds = 10;
//       this.password = await bcrypt.hash(this.password, saltRounds);
//     }

//     next();
//   });

// To Do: isCorrectPassword schema method
// Pasted from activity, same thing; needs a closer look-at:
// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

const User = model("User", userSchema);

module.exports = User;
