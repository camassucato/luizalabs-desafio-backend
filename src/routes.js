import { Router } from 'express';
import ApiController from './app/controllers/ApiController';
import watcherMiddleware from './app/middlewares/watcher';

const routes = new Router();

//
// API ROUTES
//
routes.get('/', ApiController.doIndex);
routes.get('/parser', ApiController.doParser);
routes.post('/match', watcherMiddleware, ApiController.doMatch);
routes.get('/players', watcherMiddleware, ApiController.doPlayers);
routes.get('/maps', watcherMiddleware, ApiController.doMaps);
routes.get('/ranking', watcherMiddleware, ApiController.doRanking);

export default routes;
