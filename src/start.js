"use strict";

import express from "express";
import session from "express-session";
import {graphqlExpress, graphiqlExpress} from "graphql-server-express";
import uuid from "node-uuid";
import passport from "passport";
import {Strategy} from "passport-local";
import bodyParser from "body-parser";
import cors from "cors";

import "./auth";
import schema from "./schema/schema";

const URL = "http://localhost";
const PORT = 4000;

export const start = async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: true }) );
    app.use(session({ genid: (req) => uuid.v4(), secret: "1$19Fn5Y#sErVk@C" }));
    app.use("/graphql", bodyParser.json(), graphqlExpress({schema}));
    app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

    app.post("/login", passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    }));

    app.listen(PORT, () => console.log(`Visit ${URL}:${PORT}`));
    console.log(`Running a GraphQL API server at ${URL}:${PORT}/graphql`);

  } catch (e) {
    console.log(e);
  }
}
