const { gql } = require("apollo-server-express");

// To Do: What needs to be required fields on these types? (Which properties get the '!', Is ID always required?)

const typeDefs = gql`
  # scalar Upload

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
    following: [User]
    followedBy: [User]
  }

  type Poem {
    _id: ID
    poemText: [String]
    poemAuthor: String
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
    allPoems: [Poem]
    poem(poemId: ID!): Poem

  }

  #look out for auth here, still needs saves
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPoem(poemText: [String]!, poemAuthor: String!): Poem
    addLike(poemId: ID!, likedBy: String!): Poem
    addComment(poemId: ID!, commentText: String!, commentAuthor: String!): Poem
    addSave(poemId: ID!, savedBy: String!): Poem
    updateAbout(username: String!, aboutStr: String!): User
    # return the following user's list of people they follow 
    addFollow(username: String!, followedUsername: String!): User
    removeFollow(username: String!, followedUsername: String!): User
    # updateImage(userId: ID!, image: Upload!): User
    removeUser(username: String!): User
    removePoem(poemId: ID!): Poem
    removeLike(poemId: ID!, likeId: ID!, likedBy: String!): Poem
    removeComment(poemId: ID!, commentId: ID!, commentAuthor: String!): Poem
    removeSave(poemId: ID!, saveId: ID!, savedBy: String!): Poem
  }
`;

module.exports = typeDefs;
