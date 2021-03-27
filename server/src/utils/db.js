/* eslint-disable no-console */
const mongoose = require('mongoose');

async function connectDB() {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}

mongoose.connection.on('error', function (err) {
  console.log('Error connecting to DB: ', err.stack);
});

mongoose.connection.on('disconnected', function () {
  console.log('Lost MongoDB connection.');
  console.log('Retrying...');
  connectDB();
});

mongoose.connection.on('connected', function () {
  console.log('Connected to DB');
});

mongoose.connection.on('reconnected', function () {
  console.log('Reconnected...');
});

// SIGINT signal works in linux
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Force to close the mongodb connection');
    process.exit(0);
  });
});

module.exports = {
  connectDB
};
