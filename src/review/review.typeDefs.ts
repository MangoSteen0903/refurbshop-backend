import { gql } from "apollo-server-express";

export default gql`
  type Review {
    context: String!
    rate: Float!
    store: Store!
    user: User!
    item: Item!
    imageURL: String!
    isMine: Boolean!
    createdAt: String!
    updateAt: String!
  }
`;
