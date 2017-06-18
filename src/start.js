"use strict";

import {MongoClient, ObjectId} from 'mongodb'
import express from "express";
import session from "express-session";
import {graphqlExpress, graphiqlExpress} from "graphql-server-express";
import uuid from "node-uuid";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";

import schema from "./schema/schema";

const URL = "http://localhost";
const PORT = 4000;
const MONGO_PASSWORD = "R0lMrQCdFfMk0rvf";
const MONGO_DATABASE = "corgo";
const MONGO_URL = `mongodb://admin:${MONGO_PASSWORD}@corgo-shard-00-00-lx3by.mongodb.net:27017,corgo-shard-00-01-lx3by.mongodb.net:27017,corgo-shard-00-02-lx3by.mongodb.net:27017/${MONGO_DATABASE}?ssl=true&replicaSet=corgo-shard-0&authSource=admin`;

console.log(MONGO_URL);

// require("./auth.js"); //see snippet below

// const prepare = (o) => {
//   o._id = o._id.toString();
//   return o;
// }

export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL);
    const Ideas = db.collection("ideas");
    const app = express();

    const resolvers = {};

    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: true }) );

    app.use(session({
      genid: (req) => uuid.v4(),
      secret: "1$19Fn5Y#sErVk@C"
    }));

    app.use("/graphql", bodyParser.json(), graphqlExpress({schema}));

    app.use("/graphiql", graphiqlExpress({
      endpointURL: "/graphql"
    }));

    app.post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }));

    app.listen(PORT, () => console.log(`Visit ${URL}:${PORT}`));
    console.log(`Running a GraphQL API server at ${URL}:${PORT}/graphql`);

  } catch (e) {
    console.log(e);
  }
}
