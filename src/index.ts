import express, { Express } from 'express';

import { appDataSource } from './database/datasource';

const app: Express = express();

app.use(express.json());

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.get('/', (_req, res) => {
  return res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
