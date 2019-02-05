const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../../business/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});


passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      proxy: true
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = User.findByGoogleId(profile.id);
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = User.add({
          googleId: profile.id,
          displayName: profile.displayName
        });

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
