/* eslint consistent-return:0 import/order:0 */
require('dotenv').config();

const express = require('express');
const logger = require('./logger');

const ApolloServer = require('apollo-server-express').ApolloServer;
const gql = require('apollo-server-express').gql;

const faker = require('faker');
const times = require('lodash').times;
const random = require('lodash').random;

const typeDefs = require('./api/gql/schema');
const resolvers = require('./api/gql/resolvers/index');
const db = require('./api/models');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
})

const app = express();
server.applyMiddleware({ app });

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// set force: false to prevent sequelize from dropping
// existing tables
let dropTable = false;
if(process.env.DROP_EXISTING_TABLES === 'true') { dropTable = true }
db.sequelize.sync({ force: dropTable }).then(() => {

  if (process.env.INIT_DUMMY_DATA === 'true'){
    // populate category table with dummy data
    db.category.bulkCreate(
      times(10, () => ({
        name: faker.lorem.slug(),
        color: 'red'
      }))
    );
    // populate movement table with dummy data
    db.movement.bulkCreate(
      times(50, () => ({
        description: faker.lorem.sentence(),
        amount: faker.random.number(),
        issue_date: faker.date.recent(),
        categoryId: random(1, 10)
      }))
    );
  }

  // Start your app.
  app.listen(port, host, async err => {
    if (err) {
      return logger.error(err.message);
    }
  
    // Connect to ngrok in dev mode
    if (ngrok) {
      let url;
      try {
        url = await ngrok.connect(port);
      } catch (e) {
        return logger.error(e);
      }
      logger.appStarted(port, prettyHost, url);
    } else {
      logger.appStarted(port, prettyHost);
    }
  });
});