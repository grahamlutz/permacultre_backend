// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Local Strategy for user login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// JWT Strategy for authenticated requests
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.userId);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;