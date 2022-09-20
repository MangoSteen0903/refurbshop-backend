import { hash } from "bcrypt";
import { Resolvers } from "../types";
const resolvers: Resolvers = {
  Mutation: {
    createUser: async (
      _,
      { username, name, email, password, location, isOwner },
      { client }
    ) => {
      const hashedPassword = await hash(password, 10);
      const newUser = await client.user.create({
        data: {
          username,
          name,
          email,
          password: hashedPassword,
          location,
          isOwner,
        },
      });
      if (!newUser) {
        return {
          ok: false,
          error: "Can't create User. Try again.",
        };
      } else {
        return {
          ok: true,
        };
      }
    },
  },
};

export default resolvers;
