import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type editStoreStatus {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editStore(
      name: String!
      location: String!
      description: String
      bannerImg: Upload
      profileImg: Upload
    ): editStoreStatus!
  }
`;
