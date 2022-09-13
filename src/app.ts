import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from '@src/routes';
import config from 'config';
import expressPino from 'express-pino-logger';
import logger from '@src/util/logger';

export class SetupServer {
  public server: Express = express();

  constructor(private port = config.get('App.port') || 3000) {
    this.setupExpress();
    this.cors();
  }

  public start(): void {
    this.getApp().listen(this.port, () =>
      logger.info(`Server is running on port ${this.port}`)
    );
  }

  public getApp(): Express {
    const app: Express = routes(this.server);
    return app;
  }

  private setupExpress(): void {
    this.server.use(bodyParser.json());
    this.server.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.server.use(expressPino({ logger }));
  }

  private cors(): void {
    this.server.use(cors());
  }
}
