const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');

const blogRouter = require('./controllers/blogs');

const server = http.createServer(app);
require('dotenv').config();
app.use(cors());
app.use(express.json());
const mongoUrl = process.env.MONGODB_URI;

console.log('Connecting to Database');
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected To MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

app.use('/api/blogs', blogRouter);

server.listen(config.PORT, () => {
  logger.info(`Server running on Port ${config.PORT}`);
});
