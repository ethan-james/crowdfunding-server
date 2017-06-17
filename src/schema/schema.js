"use strict";

import {makeExecutableSchema} from "graphql-tools";
import Idea from "./idea";

const RootQuery = `
  type RootQuery {
    idea(id: String!): Idea
  }
`;

const SchemaDefintion = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefintion,
    RootQuery,
    Idea
  ],
  resolvesr: {}
});