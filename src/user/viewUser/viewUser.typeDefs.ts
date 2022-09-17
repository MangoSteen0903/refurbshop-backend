import { gql } from "apollo-server";

export default gql`
  type viewUserStatus {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    viewUser(username: String!): viewUserStatus!
  }
`;
