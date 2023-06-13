import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
    }
  }
`;

export const QUERY_USER_ABOUT = gql`
  query getUserAbout($username: String!) {
    user(username: $username) {
      about
    }
  }
`;

export const QUERY_USER_POEMS = gql`
  query getUserPoems($username: String!) {
    user(username: $username) {
      poems {
        _id
        createdAt

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

export const QUERY_ALL_POEMS = gql`
  query getAllPoems {
    allPoems {
      _id
      poemText
      poemAuthor
      createdAt
      likes {
        _id
        likedBy {
          username
        }
      }
      comments {
        _id
        commentAuthor {
          username
        }
        commentText
        createdAt
      }
      saves {
        _id
        savedBy {
          username
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
