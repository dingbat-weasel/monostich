import { gql } from "@apollo/client";

export const QUERY_USER_USERNAME = gql`
  query Query {
    user(username: "isaac") {
      username
    }
  }
`;

export const QUERY_USER = gql`
  query userPoemData {
    user(username: "isaac") {
      _id
      username
      poems {
        _id
        poemTitle
        poemText
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
