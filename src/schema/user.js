"use strict";

import bcrypt from "bcrypt";
import {find, all, insert} from "../db";

const SALT_WORK_FACTOR = 10;

export const UserType = `
  type User {
    id: String!
    name: String
    email: String!
    created: Int!
  }
`;

export const UserResolvers = {
  Query: {
    user: async (root, {id}) => await find("users", id),
    users: async () => await all("users")
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      if (args.password) {
        const hash = await bcrypt.hash(args.password, SALT_WORK_FACTOR);
        return await insert("users", { ...args, password: hash });
      } else {
        throw new Error("no password provided");
      }
    }
  }
};