import { gql } from "apollo-server-express";

export default gql`
  type Store {
    id: String!
    name: String!
    location: String!
    description: String!
    bannerImg: String!
    profileImg: String!
    items: [Item]
    roadAddress: String!
    jibunAddress: String!
    distance: String
  }
`;
