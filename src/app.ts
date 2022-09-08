import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from '@src/routes';

export class SetupServer {
  public server: Express = express();

  constructor(private port = 3000) {
    this.setupExpress();
    this.cors();
  }

  public start(): void {
    this.getApp().listen(this.port, () =>
      console.log(`Server is running on port ${this.port}`)
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
  }

  private cors(): void {
    this.server.use(cors());
  }
}
