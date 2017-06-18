import passport from "passport";

let LocalStrategy = require("passport-local").Strategy;

import {DB} from "./schema/schema.js";

passport.use("local", new LocalStrategy(
  (username, password, done) => {
    let checkPassword = DB.Users.checkPassword(username, password);
    let getUser = checkPassword.then((is_login_valid) => {
      if (is_login_valid) {
        return DB.Users.getUserByUsername(username);
      } else {
        throw new Error("invalid username or password");
      }
    }).then(user => done(null, user)).catch(err => done(err));
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