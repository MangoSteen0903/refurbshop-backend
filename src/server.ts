import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import client from "./client";
import schema from "./schema";
import * as dotenv from "dotenv/config";
import * as express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { getUser } from "./user/user.utils";

const port = process.env.PORT;
async function startServer() {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        coordinates: {
          x: req.headers.longitude,
          y: req.headers.latitude,
        },
        client,
        currentStore: parseInt(await req.headers.currentstoreid),
      };
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  app.use("/static", express.static("uploads"));
  server.applyMiddleware({ app });
  app.listen({ port }, () => {
    console.log(
      `🚀 Server ready at https://milkymilkycode.com/proxy/${port}/graphql`
    );
  });
}

startServer();
