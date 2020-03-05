import { Router } from 'express';
import ApiController from './app/controllers/ApiController';

const routes = new Router();

routes.get('/', ApiController.index);
routes.get('/parser', ApiController.parser);

export default routes;
