import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    email: String!
    username: String!
    name: String!
    location: String!
    profileImg: String
    isOwner: Boolean!
    currentCoordinate: String
    wishlist: [Item]
  }
`;
