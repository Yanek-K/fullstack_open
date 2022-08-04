const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

require('dotenv').config();

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(422).json({ error: 'Username already exists' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  logger.error(error.message);

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.decodedToken = decodedToken;
  } catch (error) {
    request.decodedToken = null;
  }

  next();
};

const userExtractor = (request, response, next) => {
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  request.user = User.findById(decodedToken.id);

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
