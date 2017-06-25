import passport from "passport";

let LocalStrategy = require("passport-local").Strategy;

import bcrypt from "bcrypt";
import {find, insert} from "./db";

passport.use("local", new LocalStrategy(
  (email, password, done) => {
    const error = new Error("invalid username or password");
    
    find("users", {email}).then(user => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            done(null, user);
          } else {
            done(error);
          }
        });
      } else {
        done(error);
      }
    }).catch(err => done(err));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  DB.Users.get(id).then((user, err) => {
    return done(err, user);
  });
});