const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

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
