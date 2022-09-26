import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../user/types";
import { protectedResolver } from "../../user/user.utils";
import { getGeoLocation } from "../store.utils";

const resolver: Resolvers = {
  Mutation: {
    createStore: protectedResolver(
      async (
        _,
        { name, location, description, bannerImg, profileImg },
        { client, loggedInUser }
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

        const { roadAddress, jibunAddress } = await getGeoLocation(location);

        const newStore = await client.store.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            name,
            location,
            roadAddress,
            jibunAddress,
            description,
            ...(bannerUrl && { bannerImg: bannerUrl }),
            ...(profileUrl && { profileImg: profileUrl }),
          },
        });
        if (!newStore) {
          return {
            ok: false,
            error: "Could not make store. Please Try again.",
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
