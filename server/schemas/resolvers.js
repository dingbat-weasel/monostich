// const { AuthenticationError } = require("apollo-server-express");
const { User, Poem } = require("../models");
// TO DO: AUTHENTICATION STUFF
// const {signToken} = require('../utils/auth');

// TO DO: QUERIES AND MUTATIONS

// TO DO:
// With our DB we want to store likes, comments, saves on both the poem itself and the user associated. So for example during a mutation in which a user is saving a poem we want to: 1) save a {User} on the poem model in [saves] and 2) save a {Poem} on the user model in [savedPoems].
// These are two separate operations to the db, how do we accomplish both during one mutation and add that to the resolver code?

//poem or poems in '' ?
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("poems");
    },
    // Should we use username or _id?
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("poems");
    },
    poems: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Poem.find(params).sort({ createdAt: -1 });
    },
    poem: async (parent, { poemId }) => {
      return Poem.findOne({ _id: poemId });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        //throw new AuthenticationError?
        throw new console.error("No user found with this email");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        //throw new authen?
        throw new console.error("incorrect credentials");
      }
      //const token
      return { user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      //token
      return { user };
    },
    addPoem: async (parent, { poemTitle, poemText, poemAuthor }) => {
      const poem = await Poem.create({ poemTitle, poemText, poemAuthor });

      await User.findOneAndUpdate(
        { _id: poemAuthor },
        { $addToSet: { poems: poem._id } }
      );
      return poem;
    },
    addLike: async (parent, { poemId, likedBy }) => {
      return Poem.findOneAndUpdate(
        {
          _id: poemId,
        },
        { $addToSet: { likes: likedBy } },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addComment: async (parent, { poemId, commentText, commentAuthor }) => {
      return Poem.findOneAndUpdate(
        { _id: poemId },
        { $addToSet: { comments: { commentText, commentAuthor } } },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addSave: async (parent, { poemId, savedBy }) => {
      return Poem.findOneAndUpdate(
        {
          _id: poemId,
        },
        { $addToSet: { saves: savedBy } },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    removePoem: async (parent, { poemId }) => {
      return Poem.findOneAndDelete({ _id: poemId });
    },
    removeLike: async (parent, { poemId, likeId }) => {
      return Poem.findOneAndUpdate(
        { _id: poemId },
        { $pull: { likes: { _id: likeId } } },
        { new: true }
      );
    },
    removeComment: async (parent, { poemId, commentId }) => {
      return Poem.findOneAndUpdate(
        { _id: poemId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
    removeSave: async (parent, { poemId, saveId }) => {
      return Poem.findOneAndUpdate(
        { _id: poemId },
        { $pull: { saves: { _id: saveId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
