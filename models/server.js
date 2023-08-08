const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT;
    this.authPath = '/api/auth';
    this.usersPath = '/api/users';

    // Connect to DB
    this.connectDB();

    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Running on ', this.port);
    });
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Parser
    this.app.use(express.json());
    // Public directory
    this.app.use(express.static('public'));
  }

  async connectDB() {
    await dbConnection();
  }

}

module.exports = Server;