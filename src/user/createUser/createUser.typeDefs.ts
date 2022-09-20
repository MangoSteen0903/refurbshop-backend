import { gql } from "apollo-server";

export default gql`
  type createUserStatus {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createUser(
      username: String!
      name: String!
      email: String!
      password: String!
      location: String
      isOwner: Boolean!
    ): createUserStatus!
  }
`;
