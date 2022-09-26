import fetch from "node-fetch";

type location = {
  x: number;
  y: number;
};
export const getGeoLocation = async (location: string) => {
  const {
    addresses: [{ roadAddress, jibunAddress, x, y }],
  } = await (
    await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${location}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NCP_ID,
          "X-NCP-APIGW-API-KEY": process.env.NCP_SECRET_KEY,
          Accept: "application/json",
        },
      }
    )
  ).json();
  return {
    roadAddress,
    jibunAddress,
    location: {
      x,
      y,
    },
  };
};

export const getDistance = async (start: location, goal: location) => {
  console.log(start);
  console.log(goal);
  if (start.x == goal.x && start.y == goal.y) return 0;
  const radLat1 = (Math.PI * start.x) / 180;
  const radLat2 = (Math.PI * goal.x) / 180;
  const theta = start.y - goal.y;
  const radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;

  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  const result = +dist / 1000 + "km";
  console.log(result);
  return result;
};
