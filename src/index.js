const express = require('express');
const database = require('./config/database')
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(express.json());

const port = 3001;

app.get('/', eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});