import './bootstrap';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import './database';

class App {
  constructor() {
    //
    // EXPRESS
    //
    this.server = express();
    //
    // MIDDLEWARE E ROUTERS
    //
    this.middlewares();
    this.routes();
    //
    // EXCEPTION HANDLER
    //
    this.exceptionHandler();
  }

  middlewares() {
    //
    // CORS
    //
    this.server.use(cors());
    //
    // USES JSON
    //
    this.server.use(express.json());
  }

  //
  // ROUTES
  //
  routes() {
    this.server.use(routes);
  }

  //
  // EXCEPTION HANDLER
  //
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      return res.status(500).json({ error: 'SERVER INTERNAL ERROR' });
    });
  }
}

export default new App().server;
