import { hash } from "bcrypt";
import e = require("express");
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../types";
import { protectedResolver } from "../user.utils";

export const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          email,
          username,
          name,
          location,
          profileImg,
          password: newPassword,
          isOwner,
        },
        { client, loggedInUser }
      ) => {
        let hashPassword = null;
        let profileUrl = null;
        if (profileImg) {
          profileUrl = await uploadToS3("user", profileImg, loggedInUser.id);
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
            isOwner,
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
