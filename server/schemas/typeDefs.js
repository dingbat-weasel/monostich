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
    likedPoems: [Poem]
    commentedPoems: [Poem]
    savedPoems: [Poem]
  }

  type Poem {
    _id: ID
    poemTitle: String
    poemText: [String]
    poemAuthor: ID
    createdAt: String
    likes: [Like]!
    comments: [Comment]!
    saves: [Save]!
  }

  type Like {
    _id: ID
    likedBy: User
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: User
    createdAt: String
  }

  type Save {
    _id: ID
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
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
    addPoem(poemText: String!, poemAuthor: ID!): Poem
    addLike(poemId: ID!, likedBy: ID!): Poem
    addComment(poemId: ID!, commentText: String!, commentAuthor: ID!): Poem
    addSave(poemId: ID!, savedBy: ID!): Poem
    removeUser(userId: ID!): User
    removePoem(poemId: ID!): Poem
    removeLike(poemId: ID!, likeId: ID!, likedBy: ID!): Poem
    removeComment(poemId: ID!, commentId: ID!, commentAuthor: ID!): Poem
    removeSave(poemId: ID!, saveId: ID!, savedBy: ID!): Poem
  }
`;

module.exports = typeDefs;
