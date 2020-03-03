import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';

class App {
  constructor() {
    //
    // EXPRESS
    this.server = express();
    //
    // ROUTES
    this.routes();
    //
    // EXCEPTIONS
    this.exceptionHandler();
  }

  middlewares() {
    //
    // CORS
    this.server.use(cors());
    //
    // JSON
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      return res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
    });
  }
}

export default new App().server;
