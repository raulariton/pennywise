require('dotenv').config(/*Env file location*/); 
const express = require('express');
const eventRoutes = require('./routes/eventRoutes');
const myDataSource = require('./config/database');

myDataSource
  .initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const app = express();
app.use(express.json());

const port = 3001;

app.use('/users', eventRoutes);