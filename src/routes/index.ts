import express, { Express } from 'express';
import path from 'path';
import {
  RoutingControllersOptions,
  useExpressServer,
} from 'routing-controllers';
import { authorizationChecker } from '@src/shared/middlewares/AutorizationChecker';
import { currentUserChecker } from '@src/shared/middlewares/CurrentUserChecker';

export function routes(app: Express = express()): Express {
  const options: RoutingControllersOptions = {
    validation: true,
    cors: true,
    routePrefix: '/api',
    defaultErrorHandler: false,
    authorizationChecker,
    currentUserChecker,
    controllers: [path.join(__dirname, '..', '/modules/**/controllers/*.ts')],
    middlewares: [path.join(__dirname, '..', '/shared/middlewares/*.ts')],
  };

  const server: Express = useExpressServer(app, options);
  return server;
}
