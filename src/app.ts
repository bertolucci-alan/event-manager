import express, { Express } from 'express';
import { routes } from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';

export class SetupServer {
  constructor(private port = 3000) {}
  public app: Express = routes(express());

  public init(): void {
    this.setupExpress();
  }

  public start(): void {
    this.app.listen(this.port, () =>
      console.log(`Server is running on port ${this.port}`)
    );
  }

  public getApp(): Express {
    return this.app;
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }
}
