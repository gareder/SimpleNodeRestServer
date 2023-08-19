const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT;
    this.paths = {
      authPath: '/api/auth',
      categoriesPath: '/api/categories',
      productsPath: '/api/products',
      searchesPath: '/api/searches',
      usersPath: '/api/users',
    }

    // Connect to DB
    this.connectDB();

    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  routes() {
    this.app.use(this.paths.authPath, require('../routes/auth'));
    this.app.use(this.paths.categoriesPath, require('../routes/categories'));
    this.app.use(this.paths.productsPath, require('../routes/products'));
    this.app.use(this.paths.searchesPath, require('../routes/searches'));
    this.app.use(this.paths.usersPath, require('../routes/users'));
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