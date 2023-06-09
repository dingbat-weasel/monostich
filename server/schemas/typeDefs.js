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
    poemAuthor: ID
    createdAt: String
  }

  type Like {
    _id: ID
    likedBy: User
  }

  type Comment {
    # module 24 in MERN, has _id made but not as a schema in the models.
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Save {
    _id: ID
    savedPoem: Poem
    savedBy: User
  }

  # type: Auth {}
  type Query {
    users: [User]
    user(username: String!): User
    poems(username: String): [Poem]
    poem(poemId: ID!): Poem
  }

  #look out for auth here, still needs saves
  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addPoem(poemText: String!, poemAuthor: ID!): Poem
    addComment(poemId: ID!, commentText: String!, commentAuthor: ID!): Poem
    removePoem(poemId: ID!): Poem
    removeComment(poemId: ID!, commentId: ID!): Poem
    addLike(poemId: ID!, likedBy: ID!): Poem
  }
`;

module.exports = typeDefs;
