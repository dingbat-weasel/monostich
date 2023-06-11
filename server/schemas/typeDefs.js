const { gql } = require("apollo-server-express");

// To Do: What needs to be required fields on these types? (Which properties get the '!', Is ID always required?)

// To DO: AUTH

const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID
    username: String
    email: String
    password: String
    about: String
    # image: String
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    poems(username: String): [Poem]
    poem(poemId: ID!): Poem
  }

  #look out for auth here, still needs saves
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPoem(poemTitle: String, poemText: [String]!, poemAuthor: ID!): Poem
    addLike(poemId: ID!, likedBy: ID!): Poem
    addComment(poemId: ID!, commentText: String!, commentAuthor: ID!): Poem
    addSave(poemId: ID!, savedBy: ID!): Poem
    updateAbout(userId: ID!, aboutStr: String!): User
    # updateImage(userId: ID!, image: Upload!): User
    removeUser(userId: ID!): User
    removePoem(poemId: ID!): Poem
    removeLike(poemId: ID!, likeId: ID!, likedBy: ID!): Poem
    removeComment(poemId: ID!, commentId: ID!, commentAuthor: ID!): Poem
    removeSave(poemId: ID!, saveId: ID!, savedBy: ID!): Poem
  }
`;

module.exports = typeDefs;
