const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('dotenv').config();

require('./models/User');
require('./models/Blog');

require('./_common/services/passport');



mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);
require('./routes/blog-routes')(app);
require('./routes/upload-routes')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('../web/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('..', 'web', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
