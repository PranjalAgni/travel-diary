const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const db = require('./utils/db');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');
const users = require('./api/users');

const app = express();

db.connectDB();
app.use(express.json());
app.use(morgan('common'));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"]
      }
    }
  })
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
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
