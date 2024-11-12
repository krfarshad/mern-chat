import passport from "passport";
import { config } from "../config/global.config";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { User } from "../models/user-model";

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
};

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);

    if (!findUser) done("Incorrect password or username", null);
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new JWTStrategy(jwtConfig, async (payload, done) => {
    try {
      const findUser = await User.findById(payload.id);
      if (!findUser) throw new Error("User not found");
      done(null, findUser);
    } catch (err) {
      done(err);
    }
  })
);
