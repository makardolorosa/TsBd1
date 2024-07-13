import express, { Express } from 'express';

import { AppDataSource } from './database/datasource';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user_routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app: Express = express();

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    const host = process.env.HOST ?? 'localhost';
    const port = process.env.PORT ? Number(process.env.PORT) : 3002;
    const app = express();
    app.use(express.json());
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.listen(port, host, () => {
      console.log(`[ready] http://${host}${port}`);
    });
  })
  .catch((error) => console.log(error));
