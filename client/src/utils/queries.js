import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
    }
  }
`;

export const QUERY_USER_POEMS = gql`
  query getUserPoems($username: String!) {
    user(username: $username) {
      poems {
        _id
        createdAt
        poemTitle
        poemText
        likes {
          _id
          likedBy {
            _id
            username
          }
        }
        comments {
          _id
          commentText
          commentAuthor {
            _id
            username
          }
          createdAt
        }
        saves {
          _id
          savedBy {
            _id
            username
          }
        }
      }
    }
  }
`;

export const QUERY_USER_SAVES = gql`
  query getUserSavedPoems($username: String!) {
    user(username: $username) {
      _id
      savedPoems {
        _id
        poemTitle
        poemText
        poemAuthor
        createdAt
        likes {
          _id
          likedBy {
            _id
            username
          }
        }
        comments {
          _id
          commentText
          commentAuthor {
            _id
            username
          }
          createdAt
        }
        saves {
          _id
          savedBy {
            _id
            username
          }
        }
      }
    }
  }
`;
