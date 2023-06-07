// const { AuthenticationError } = require("apollo-server-express");
const { User, Poem } = require("../models");
// TO DO: AUTHENTICATION STUFF
// const {signToken} = require('../utils/auth');

// TO DO: QUERIES AND MUTATIONS

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
  },
};

module.exports = resolvers;
