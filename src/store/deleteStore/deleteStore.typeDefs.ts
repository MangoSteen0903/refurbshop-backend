import { gql } from "apollo-server-express";

export default gql`
  type deleteStoreStatus {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteStore(id: Int!): deleteStoreStatus!
  }
`;
