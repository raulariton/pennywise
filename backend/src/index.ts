import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dataSource from '@config/database';
import authRoutes from '@routes/authRoutes';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;

// middleware to parse JSON requests
app.use(express.json());
// middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));
// middleware to parse cookies
app.use(cookieParser());

// configure routes
app.use('/auth', authRoutes);

dataSource
  .initialize()
  .then(async () => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
