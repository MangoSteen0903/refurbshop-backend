import { Resolvers } from "../user/types";
import { getDistance, getGeoLocation } from "./store.utils";
const resolver: Resolvers = {
  Store: {
    distance: async (root, _, { loggedInUser, coordinates }) => {
      const { location } = root;
      const currentLocation = {
        x: parseFloat(coordinates.x),
        y: parseFloat(coordinates.y),
      };
      const {
        location: { x: latitude, y: longitude },
      } = await getGeoLocation(location);
      const destination = { x: parseFloat(latitude), y: parseFloat(longitude) };
      const distance = await getDistance(currentLocation, destination);
      return distance;
    },
  },
};

export default resolver;
