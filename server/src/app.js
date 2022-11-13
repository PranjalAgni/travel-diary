require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const db = require('./utils/db');
const store = require('./utils/store');
const logs = require('./api/logs');
const users = require('./api/users');

const initApp = async () => {
  const server = new GraphQLServer({
    // eslint-disable-next-line global-require
    typeDefs: path.resolve(__dirname, './schema.graphql'),
    resolvers: {
      Query,
      Mutation
    },
    context: {
      store
    }
  });

  const app = server.express;

  console.log('app is starting');
  await db.connectDB();
  app.use(express.json());
  app.use(morgan('common'));
  app.use(
    helmet(
      process.env.NODE_ENV === 'production'
        ? {
            contentSecurityPolicy: {
              directives: {
                defaultSrc: ["'self'"]
              }
            }
          }
        : false
    )
  );

  app.use(
    cors({
      origin: 'http://localhost:4040',
      methods: ['GET', 'POST'],
      credentials: true
    })
  );

  app.use(compression());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!'
    });
  });

  app.use('/api/logs', logs);
  app.use('/api/users', users);
  return server;
};

module.exports = initApp;
