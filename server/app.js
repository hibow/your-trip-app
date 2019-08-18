const express = require('express');
const next = require('next');
const db = require('../db/index');
// const User = require('../db/models/User');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
   // configuring MongoDB session store
  const MongoStore = mongoSessionStore(session);
  const sess = {
    name: 'nextshop.sid',
    secret: 'keyboard cat',
    store: new MongoStore({
      mongooseConnection: db,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };
  server.use(session(sess));
    // this is testing code, remove later
    // server.get('/', async (req, res) => {
    //   req.session.foo = 'bar';
    //   const user = await User.findOne({ slug: 'team-builder-book' });
    //   app.render(req, res, '/', { user });
    // });
  server.get('*', (req, res) => handle(req, res));
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🤘 on http://localhost:${port}`);
  });
}).catch(err => console.log(err));