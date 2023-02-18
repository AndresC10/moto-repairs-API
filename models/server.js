const express = require('express');
const { usersRouter } = require('../routes/users.routes');
const { repairsRouter } = require('../routes/repairs.routes');
const cors = require('cors');
const { db } = require('../database/db');
const initModel = require('./init.models');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      users: '/api/v1/users',
      repairs: '/api/v1/repairs',
    };
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.repairs, repairsRouter);
    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

module.exports = Server;
