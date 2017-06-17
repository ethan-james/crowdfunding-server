"use strict";

const graphql = require("graphql");

const ideaType = new graphql.GraphQLObjectType({
  name: "IdeaType",
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    text: {
      type: graphql.GraphQLString,
      description: "The body text of the Idea"
    },
    created: {
      type: graphql.GraphQLInt,
      description: "The creation timestamp of the Idea"
    }
  }
});