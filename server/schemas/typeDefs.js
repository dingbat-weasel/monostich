const { gql } = require("apollo-server-express");

// To Do: What needs to be required fields on these types? (Which properties get the '!', Is ID always required?)

// TO DO: LIKES and SAVES
// To DO: AUTH
// TO DO: QUERIES
// TO DO: MUTATIONS

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    poems: [Poem]
  }

  type Poem {
    _id: ID
    poemText: String
    poemAuthor: String
    createdAt: String
  }

  #   type Like {
  #     _id: ID
  #     likedBy: User
  #   }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    # How do dates work? At what point is our date converted from date obj to string?
    createdAt: String
  }

  #   type Save {
  #     _id: ID
  #     savedPoem: Poem
  #     savedBy: User
  #   }

  # type: Auth {}
  # type: Query {}
  # type: Mutation {}
`;

module.exports = typeDefs;
