// const { AuthenticationError } = require("apollo-server-express");
const { User, Poem } = require("../models");
// TO DO: AUTHENTICATION STUFF
// const {signToken} = require('../utils/auth');

// TO DO: QUERIES AND MUTATIONS

//poem or poems in '' ?
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('poems');
    },
    user: async(parent, {username}) => {
      return User.findOne({username}).populate('poems')
    },
    poems: async(parent, {username}) => {
      const params = username ? {username} : {};
      return Poem.find(params).sort({createdAt: -1});
    },
    poem: async (parent,{ poemId}) => {
      return Poem.findOne({_id: poemId});
    },
  },

  Mutation: {
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username,email,password});
      //token
      return {user};
    },
    login: async (parent,{username, email, password}) => {
      const user = await User.findOne({email});

      if(!user) {
        //throw new AuthenticationError?
        throw new console.error('no user found with this email');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        //throw new authen?
        throw new console.error("incorrect credentials")
      }
      //const token
      return {user};
    },
    addPoem: async (parent, {poemText, poemAuthor}) => {
      const poem = await Poem.create({poemText, poemAuthor});

      await User.findOneAndUpdate(
        {username: poemAuthor},
        {$addToSet: {poems: poem._id}}
      );
      return poem;
    },
    addComment: async (parent, {poemId, commentText, commentAuthor}) => {
      return Poem.findOneAndUpdate(
        {_id: poemId},
        {$addToSet: {comments: {commentText,commentAuthor}}},
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addLike: async (parent, {poemId, likedBy}) => {
      return Poem.findOneAndUpdate(
        {
          _id: poemId
        },
        {$addToSet: {likedBy: likedBy}},
        {
          new: true,
          runValidators: true,
        }
      )
    },
    removePoem: async (parent,{poemId}) => {
      return Poem.findOneAndDelete({ _id: poemId});
    },
    // removeComment: async (parent, {poemId, commentId}) => {

    // }
    // removeLike: async(parent,{poemId,likeId})
  }
};

module.exports = resolvers;
