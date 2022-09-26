import { PrismaClient, User } from "@prisma/client";
import { GraphQLScalarType } from "graphql";

type Context = {
  loggedInUser?: User;
  client: PrismaClient;
  coordinates: {
    x: string;
    y: string;
  };
  currentStore: number;
};
export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver | void;
  };
};

export type Token = {
  id: number;
  iat: number;
};
