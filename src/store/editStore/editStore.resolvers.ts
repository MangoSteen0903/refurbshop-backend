import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";
const resolver: Resolvers = {
  Mutation: {
    editStore: protectedResolver(
      async (
        _,
        { id, name, location, description, bannerImg, profileImg },
        { loggedInUser, client }
      ) => {
        let bannerUrl = null;
        let profileUrl = null;
        if (!loggedInUser.isOwner) {
          return {
            ok: false,
            error: "You're not Owner. Please re-register our website.",
          };
        }
        if (bannerImg) {
          bannerUrl = await uploadToS3(
            "store/banner",
            bannerImg,
            loggedInUser.id
          );
        }
        if (profileImg) {
          profileUrl = await uploadToS3(
            "store/profile",
            profileImg,
            loggedInUser.id
          );
        }

        const newStore = await client.store.update({
          where: {
            id,
          },
          data: {
            name,
            location,
            description,
            ...(bannerUrl && { bannerImg: bannerUrl }),
            ...(profileUrl && { profileImg: profileUrl }),
          },
        });
        if (!newStore) {
          return {
            ok: false,
            error: "Could not update store. Please Try again.",
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

export default resolver;
