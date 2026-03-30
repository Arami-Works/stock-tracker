import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    email: String!
    displayName: String
    createdAt: String!
  }

  type Query {
    """
    Current authenticated user
    """
    me: User
  }
`;
