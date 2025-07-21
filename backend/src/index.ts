import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dataSource from '@config/database';
import authRoutes from '@routes/authRoutes';
import entryRoutes from '@routes/entryRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

// middleware to parse JSON requests
app.use(express.json());
// middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));
// middleware to parse cookies
app.use(cookieParser());
// CORS middleware to allow cross-origin requests
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

// configure routes
app.use('/auth', authRoutes);
app.use('/entries', entryRoutes);

// test route
// TODO: remove
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the backend server!' });
});

dataSource
  .initialize()
  .then(async () => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // enable port reusing
    server.on('listening', () => {
      server.setMaxListeners(0);
    });

    // handle graceful shutdown
    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('Server terminated gracefully...');
        dataSource
          .destroy()
          .then(() => {
            console.log('Database connection closed.');
            process.exit(0);
          })
          .catch((err) => {
            console.error('Error closing database connection:', err);
            process.exit(1);
          });
      });
    });

    process.on('SIGINT', () => {
      server.close(() => {
        console.log('Server interrupted, shutting down...');
        dataSource
          .destroy()
          .then(() => {
            console.log('Database connection closed.');
            process.exit(0);
          })
          .catch((err) => {
            console.error('Error closing database connection:', err);
            process.exit(1);
          });
      });
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
