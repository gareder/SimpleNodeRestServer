const express = require('express')
const cors = require('cors');

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  routes() {
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

}

module.exports = Server;