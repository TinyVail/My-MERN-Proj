import gql from "graphql-tag";

export const QUERY_SELF = gql`
  {
    self {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
