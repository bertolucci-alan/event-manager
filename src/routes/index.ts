import express, { Express } from 'express';
import path from 'path';
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useExpressServer,
} from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import apiSchema from '../api-schema.json';

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

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas',
  });
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, options, {
    components: {
      schemas,
    },
    security: [{ jwt: [] }],
    apiSchema,
  });
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
  return server;
}
