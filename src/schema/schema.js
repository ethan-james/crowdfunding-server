"use strict";

import lodash from "lodash";
import {makeExecutableSchema} from "graphql-tools";
import {IdeaType, IdeaResolvers} from "./idea";
import {UserType, UserResolvers} from "./user";

const Query = `
  type Query {
    idea(id: String!): Idea
    ideas: [Idea],
    user(id: String!): User,
    users: [User]
  }

  type Mutation {
    createIdea(text: String): Idea,
    createUser(email: String!, password: String!, name: String): User
  }
`;

const SchemaDefintion = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefintion,
    Query,
    IdeaType,
    UserType
  ],
  resolvers: lodash.merge(IdeaResolvers, UserResolvers)
});