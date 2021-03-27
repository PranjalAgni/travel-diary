const initApp = require('./app');

const startServer = async () => {
  const app = await initApp();

  const options = {
    port: 4040,
    endpoint: '/graphql',
    playground: '/playground'
  };

  app.start(options, ({ port }) => {
    console.log(`Server running on http://localhost:${port}`);
    console.log('Ctrl + c to close the server');
  });
};

startServer();
