import { gql } from "@apollo/client";

export const QUERY_USER_POEMS = gql`
  query userPoemData($username: String!) {
    user(username: $username) {
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
