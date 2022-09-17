import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { client }) => {
      try {
        const user = await client.user.findUnique({ where: { email } });
        if (!user) {
          return {
            ok: false,
            error: "Can't find User. Try again.",
          };
        } else {
          const comparePw = await compare(password, user.password);
          if (!comparePw) {
            return {
              ok: false,
              error: "Password does not match. Try again.",
            };
          }
          const token = sign(
            {
              id: user.id,
            },
            process.env.SECRET_KEY
          );
          return {
            ok: true,
            token,
          };
        }
      } catch (e) {
        return e;
      }
    },
  },
};

export default resolvers;
