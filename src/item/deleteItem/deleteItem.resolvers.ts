import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    deleteItem: protectedResolver((_,{id},{client,loggedInUser}) => {}),
  },
};

export default resolver;
