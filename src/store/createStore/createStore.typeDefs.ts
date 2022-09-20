import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type createStoreStatus {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createStore(
      name: String!
      location: String!
      description: String
      bannerImg: Upload
      profileImg: Upload
    ): createStoreStatus!
  }
`;
