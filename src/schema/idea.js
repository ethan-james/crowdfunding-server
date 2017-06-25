"use strict";

import {find, all, insert} from "../db";

export const IdeaType = `
  type Idea {
    id: String!
    text: String
    created: Int!
  }
`;

export const IdeaResolvers = {
  Query: {
    idea: async (root, {id}) => await find("ideas", id),
    ideas: async () => await all("ideas")
  },
  Mutation: {
    createIdea: async (root, args, context, info) => {
      return await insert("ideas", args);
    }
  }
};