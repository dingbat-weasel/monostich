const { AuthenticationError } = require("apollo-server-express");
const { User, Poem } = require("../models");
// const {GraphQLUpload} = require('graphql-upload/GraphQLUpload.mjs'); // keeping commented while not working
// import {GraphQLUpload} from "/graphql-upload/GraphQLUpload"
// TO DO: AUTHENTICATION STUFF
const { signToken } = require("../utils/auth");

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
    // Do we need to add .populate() for likes, comments, saves?
    poems: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Poem.find(params).sort({ createdAt: -1 });
    },
    allPoems: async () => {
      return Poem.find().sort({ createdAt: -1 });
    },
    poem: async (parent, { poemId }) => {
      return Poem.findOne({ _id: poemId });
    },
  },

  // Upload: GraphQLUpload,
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email");
        // throw new console.error("No user found with this email");
      }

      const correctPw = await user.isCorrectPassword(password);
      // console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
        // throw new console.error("incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // not sure if image:file is correct?
    // updateImage: async (parent,{userId, file}) => {
    //   const {createReadStream, filename} = await file;
    //   const stream = createReadStream();
    //   const user = await User.findOneAndUpdate(
    //     {
    //       _id: userId
    //     },
    //     {
    //       image: file
    //     }
    //   )
    // },
    addPoem: async (parent, { poemText, poemAuthor }) => {
      const poem = await Poem.create({ poemText, poemAuthor });

      await User.findOneAndUpdate(
        { username: poemAuthor },
        { $addToSet: { poems: poem._id } }
      );
      return poem;
    },
    updateAbout: async (parent, { username, aboutStr }) => {
      const user = await User.findOneAndUpdate(
        { username: username },
        { about: aboutStr }
      );

      return user;
    },
    // this needs work
    addLike: async (parent, { poemId, likedBy }) => {
      const user = await User.findOneAndUpdate(
        { _id: likedBy },
        { $addToSet: { likedPoems: poemId } },
        { new: true }
      );

      const poem = await Poem.findOneAndUpdate(
        { _id: poemId },
        { $addToSet: { likes: { likedBy } } },
        { new: true, runValidators: true }
      );

      return user, poem;
    },

    // this is looking pretty good, may need tweaking
    addComment: async (parent, { poemId, commentText, commentAuthor }) => {
      const user = await User.findOneAndUpdate(
        { _id: commentAuthor },
        { $push: { commentedPoems: poemId } },
        { new: true }
      );

      const poem = Poem.findOneAndUpdate(
        { _id: poemId },
        { $push: { comments: { commentText, commentAuthor } } },
        { new: true, runValidators: true }
      );

      return user, poem;
    },
    // this needs work
    addSave: async (parent, { poemId, savedBy }) => {
      const user = await User.findOneAndUpdate(
        { _id: savedBy },
        { $addToSet: { savedPoems: poemId } },
        { new: true }
      );

      const poem = await Poem.findOneAndUpdate(
        { _id: poemId },
        { $addToSet: { saves: { savedBy } } },
        { new: true, runValidators: true }
      );

      return user, poem;
    },
    addFollow: async (parent, { username, followedUsername }) => {
      try {
        const follower = await User.findOneAndUpdate(
          {
            username: username,
          },
          {
            $addToSet: { following: followedUsername },
          },
          { new: true }
        );
        try {
          const followedUser = await User.findOneAndUpdate(
            {
              username: followedUsername,
            },
            {
              $addToSet: { followedBy: username },
            },
            { new: true }
          );
          return { follower };
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
      }
    },

    // everything below here needs work, tracking on user model needs to be included
    removeUser: async (parent, { username }) => {
      return User.findOneAndDelete({ username: username });
    },
    removePoem: async (parent, { poemId, poemAuthor }) => {
      const user = await User.findOneAndUpdate(
        { username: poemAuthor },
        { $pull: { poems: poemId } }
      );
      const poem = await Poem.findOneAndDelete({ _id: poemId });
      return user;
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
