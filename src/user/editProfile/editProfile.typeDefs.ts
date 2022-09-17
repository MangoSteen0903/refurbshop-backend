import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type editProfileStatus {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      email: String
      username: String
      name: String
      location: String
      profileImg: Upload
      password: String
    ): editProfileStatus!
  }
`;
