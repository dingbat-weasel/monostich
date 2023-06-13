import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POEM = gql`
  mutation addPoem($poemText: [String]!, $poemAuthor: String!) {
  addPoem(poemText: $poemText, poemAuthor: $poemAuthor) {
    _id
    poemText
    poemAuthor

  }
}
`;

export const ADD_FOLLOW = gql`
  mutation addFollow($username: String!, $followedUsername: String!) {
    addFollow(username: $username, followedUsername: $followedUsername) {
      username
    }
  }
`;