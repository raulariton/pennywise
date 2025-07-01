import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dataSource from '@config/database';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

dataSource
  .initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
