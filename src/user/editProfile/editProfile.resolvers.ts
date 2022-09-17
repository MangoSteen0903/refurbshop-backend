import { hash } from "bcrypt";
import e = require("express");
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { Resolvers } from "../types";
import { protectedResolver } from "../user.utils";

export const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { email, username, name, location, profileImg, password: newPassword },
        { client, loggedInUser }
      ) => {
        let hashPassword = null;
        let profileUrl = null;
        if (profileImg) {
          const {
            file: { filename, createReadStream },
          } = await profileImg;

          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const stream = createReadStream();
          const result = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          stream.pipe(result);
          profileUrl = `https://milkymilkycode.com/proxy/4000/static/${newFilename}`;
        }

        if (newPassword) {
          hashPassword = await hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            email,
            username,
            name,
            location,
            ...(profileUrl && { profileImg: profileUrl }),
            ...(hashPassword && { password: hashPassword }),
          },
        });


        if (!updatedUser.id) {
          return {
            ok: false,
            error: "Could not update profile",
          };
        } else {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export const uploadResolver = {
  Upload: GraphQLUpload,
};
